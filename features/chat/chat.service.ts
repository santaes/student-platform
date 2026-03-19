import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private socket: Socket | null = null;
  private currentUser: User | null = null;

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

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

    this.socket.on('message', (message: Message) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, message]);
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

  getMessagesBetweenUsers(userId1: string, userId2: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/chat/messages/${userId1}/${userId2}`);
  }

  sendMessage(receiverId: string, content: string): Observable<Message> {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }

    const messageData = {
      senderId: this.currentUser.id,
      receiverId,
      content
    };

    // Emit via socket for real-time delivery
    if (this.socket) {
      this.socket.emit('sendMessage', messageData);
    }

    // Also send via HTTP for persistence
    return this.http.post<Message>(`${this.apiUrl}/chat/messages`, messageData);
  }

  markAsRead(senderId: string): Observable<void> {
    if (!this.currentUser) {
      throw new Error('No current user set');
    }

    const markReadData = {
      senderId,
      receiverId: this.currentUser.id
    };

    if (this.socket) {
      this.socket.emit('markAsRead', markReadData);
    }

    return this.http.put<void>(`${this.apiUrl}/chat/messages/read`, markReadData);
  }

  getChatPartners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/chat/partners`);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/chat/unread`);
  }
}
