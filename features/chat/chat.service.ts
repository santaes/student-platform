import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject, Subject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  senderId: string;
  receiver: User;
  receiverId: string;
  createdAt: Date;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private socket: Socket | null = null;
  private currentUser: User | null = null;

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  // Store messages per conversation
  private conversationMessages = new Map<string, Message[]>();
  private currentConversationSubject = new BehaviorSubject<string>('');
  public currentConversation$ = this.currentConversationSubject.asObservable();
  
  // Track loading state to prevent duplicate API calls
  private loadingConversations = new Set<string>();

  private apiUrl = environment.apiUrl;

  constructor() {}

  setCurrentUser(user: User): void {
    this.currentUser = user;
    this.connectSocket();
  }

  private connectSocket(): void {
    if (!this.currentUser) return;

    this.socket = io(this.apiUrl, {
      query: { userId: this.currentUser.id }
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });

    this.socket.on('newMessage', (message: Message) => {
      console.log('🔍 Frontend: Received newMessage via socket:', message);
      this.addMessageToConversation(message);
    });

    this.socket.on('messageSent', (message: Message) => {
      console.log('🔍 Frontend: Received messageSent via socket:', message);
      this.addMessageToConversation(message);
    });

    this.socket.on('messagesRead', (data: { senderId: string; receiverId: string }) => {
      // Handle messages read status update if needed
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private addMessageToConversation(message: Message): void {
    const conversationKey = this.getConversationKey(message.senderId, message.receiverId);
    const currentMessages = this.conversationMessages.get(conversationKey) || [];
    
    // Check if message already exists to prevent duplicates
    const messageExists = currentMessages.some(msg => msg.id === message.id);
    if (messageExists) {
      console.log('🔍 Frontend: Message already exists, skipping:', message.id);
      return;
    }
    
    this.conversationMessages.set(conversationKey, [...currentMessages, message]);
    
    // Update current messages if this is the active conversation
    if (this.currentConversationSubject.value === conversationKey) {
      this.messagesSubject.next(this.conversationMessages.get(conversationKey) || []);
    }
  }

  private getConversationKey(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('-');
  }

  setCurrentConversation(userId1: string, userId2: string): void {
    const conversationKey = this.getConversationKey(userId1, userId2);
    this.currentConversationSubject.next(conversationKey);
    this.messagesSubject.next(this.conversationMessages.get(conversationKey) || []);
  }

  getMessagesBetweenUsers(userId1: string, userId2: string): Observable<Message[]> {
    const conversationKey = this.getConversationKey(userId1, userId2);
    
    // Prevent duplicate API calls
    if (this.loadingConversations.has(conversationKey)) {
      console.log('🔍 Frontend: Already loading conversation, skipping API call:', conversationKey);
      return this.messagesSubject.asObservable();
    }
    
    this.loadingConversations.add(conversationKey);
    
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders();
    
    // Backend expects: GET /chat/messages/:userId (current user to :userId)
    return this.http.get<Message[]>(`${this.apiUrl}/chat/messages/${userId2}`, { headers })
      .pipe(
        map(messages => {
          console.log('🔍 Frontend: Loaded messages from API:', messages.length);
          this.conversationMessages.set(conversationKey, messages);
          
          // Update current messages if this is the active conversation
          if (this.currentConversationSubject.value === conversationKey) {
            this.messagesSubject.next(messages);
          }
          
          this.loadingConversations.delete(conversationKey);
          return messages;
        })
      );
  }

  sendMessage(receiverId: string, content: string): Observable<Message> {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }

    // Emit via socket for real-time delivery
    if (this.socket) {
      this.socket.emit('sendMessage', {
        senderId: this.currentUser.id,
        receiverId,
        content
      });
    }

    // Backend expects: POST /chat/messages/:userId with body { content: string }
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders();
    
    return this.http.post<Message>(`${this.apiUrl}/chat/messages/${receiverId}`, { content }, { headers });
  }

  markAsRead(senderId: string): Observable<void> {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }

    // Emit via socket for real-time delivery
    if (this.socket) {
      this.socket.emit('markAsRead', {
        senderId,
        receiverId: this.currentUser.id
      });
    }

    // Backend expects: POST /chat/messages/:userId/read (no body needed)
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders();
    
    return this.http.post<void>(`${this.apiUrl}/chat/messages/${senderId}/read`, {}, { headers });
  }

  getChatPartners(): Observable<User[]> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders();
    
    console.log('🔍 Frontend: Making request to chat partners API');
    return this.http.get<User[]>(`${this.apiUrl}/chat/partners`, { headers })
      .pipe(
        map(response => {
          console.log('🔍 Frontend: Raw API response:', response);
          console.log('🔍 Frontend: Raw response length:', response.length);
          return response;
        })
      );
  }

  getUnreadCount(): Observable<number> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders();
    
    // Backend expects: GET /chat/unread/count
    return this.http.get<{ count: number }>(`${this.apiUrl}/chat/unread/count`, { headers })
      .pipe(map(response => response.count));
  }
}
