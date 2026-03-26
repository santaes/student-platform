import { Component, OnInit, OnDestroy, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ChatService, Message, User } from './chat.service';
import { AuthService } from '../../core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="chat-container">
      <div class="chat-sidebar">
        <h3>Чат</h3>
        <mat-nav-list>
          <mat-list-item
            *ngFor="let partner of chatPartners()"
            (click)="selectPartner(partner)"
            [class.active]="selectedPartner()?.id === partner.id"
            role="button"
            tabindex="0"
            (keydown.enter)="selectPartner(partner)"
            (keydown.space)="selectPartner(partner)"
            [attr.aria-label]="'Почати чат з ' + partner.fullName">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>{{ partner.fullName }}</span>
            <mat-chip
              *ngIf="getUnreadCountForPartner(partner.id) > 0"
              class="unread-chip">
              {{ getUnreadCountForPartner(partner.id) }}
            </mat-chip>
          </mat-list-item>
        </mat-nav-list>
      </div>

      <div class="chat-main">
        <div *ngIf="!selectedPartner()" class="no-partner-selected">
          <mat-icon>chat</mat-icon>
          <h4>Виберіть співрозмовника</h4>
          <p>Оберіть користувача зі списку, щоб розпочати чат</p>
        </div>

        <div *ngIf="selectedPartner()" class="chat-interface">
          <div class="chat-header">
            <mat-icon>person</mat-icon>
            <h4>{{ selectedPartner()?.fullName }}</h4>
          </div>

          <div class="messages-container" #messagesContainer>
            <div
              *ngFor="let message of messages$ | async"
              class="message"
              [class.sent]="message.senderId === currentUser()?.id"
              [class.received]="message.senderId !== currentUser()?.id"
              role="article"
              [attr.aria-label]="'Повідомлення від ' + message.sender.fullName + ': ' + message.content">
              <div class="message-content">
                <p>{{ message.content }}</p>
                <small class="message-time">{{ formatMessageTime(message.createdAt) }}</small>
              </div>
            </div>
          </div>

          <div class="message-input-container">
            <mat-form-field appearance="outline" class="message-input">
              <mat-label>Введіть повідомлення</mat-label>
              <input
                matInput
                [(ngModel)]="newMessage"
                (keydown.enter)="sendMessage()"
                placeholder="Напишіть повідомлення..."
                autocomplete="off"
                aria-label="Поле для введення повідомлення">
            </mat-form-field>
            <button
              mat-icon-button
              (click)="sendMessage()"
              [disabled]="!newMessage.trim()"
              aria-label="Надіслати повідомлення">
              <mat-icon>send</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      height: calc(100vh - 120px);
      background: #fafafa;
    }

    .chat-sidebar {
      width: 300px;
      background: white;
      border-right: 1px solid #e0e0e0;
      padding: 1rem;
      overflow-y: auto;
    }

    .chat-sidebar h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.2rem;
    }

    .chat-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: white;
    }

    .no-partner-selected {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #666;
      text-align: center;
    }

    .no-partner-selected mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .chat-interface {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #f8f9fa;
    }

    .chat-header h4 {
      margin: 0;
      color: #333;
    }

    .messages-container {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .message {
      max-width: 70%;
      margin-bottom: 0.5rem;
    }

    .message.sent {
      align-self: flex-end;
      margin-left: auto;
    }

    .message.received {
      align-self: flex-start;
      margin-right: auto;
    }

    .message-content {
      padding: 0.75rem;
      border-radius: 1rem;
      word-wrap: break-word;
    }

    .message.sent .message-content {
      background: #1976d2;
      color: white;
      border-bottom-right-radius: 0.25rem;
    }

    .message.received .message-content {
      background: #f1f3f4;
      color: #333;
      border-bottom-left-radius: 0.25rem;
    }

    .message-time {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      opacity: 0.7;
    }

    .message-input-container {
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      background: #f8f9fa;
    }

    .message-input {
      flex: 1;
    }

    .unread-chip {
      background: #f44336;
      color: white;
      font-size: 0.75rem;
      height: 20px;
      min-width: 20px;
      line-height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      margin-left: auto;
    }

    .active {
      background: #e3f2fd;
      color: #1976d2;
    }

    @media (max-width: 768px) {
      .chat-container {
        flex-direction: column;
        height: calc(100vh - 140px);
      }

      .chat-sidebar {
        width: 100%;
        height: 200px;
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
      }

      .message {
        max-width: 85%;
      }
    }
  `]
})
export class ChatComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);
  
  currentUser = signal<User | null>(null);
  selectedPartner = signal<User | null>(null);
  newMessage = '';
  messages$ = this.chatService.messages$;
  chatPartners = signal<User[]>([]);
  private subscriptions: Subscription[] = [];

  constructor() {
    effect(() => {
      const user = this.authService.getCurrentUser();
      console.log('🔍 ChatComponent: Effect triggered, user:', user?.id, user?.email);
      if (user) {
        this.currentUser.set({
          id: user.id,
          fullName: user.fullName,
          email: user.email
        });
        this.chatService.setCurrentUser(this.currentUser()!);
        this.loadChatPartners();
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to message changes for scroll-to-bottom
    this.subscriptions.push(
      this.chatService.messages$.subscribe(() => {
        this.scrollToBottom();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.chatService.disconnect();
  }

  loadChatPartners(): void {
    console.log('🔍 ChatComponent: Loading chat partners');
    this.chatService.getChatPartners().subscribe({
      next: (partners: User[]) => {
        console.log('🔍 ChatComponent: Received partners from API:', partners.length, partners);
        this.chatPartners.set(partners);
      },
      error: (error: any) => {
        console.error('Error loading chat partners:', error);
      }
    });
  }

  selectPartner(partner: User): void {
    this.selectedPartner.set(partner);
    if (this.currentUser()) {
      // Set current conversation first
      this.chatService.setCurrentConversation(this.currentUser()!.id, partner.id);
      
      // Only load messages if they're not already loaded
      this.loadMessages(partner.id);
      this.chatService.markAsRead(partner.id).subscribe();
    }
  }

  loadMessages(partnerId: string): void {
    if (!this.currentUser()) return;

    this.chatService.getMessagesBetweenUsers(this.currentUser()!.id, partnerId).subscribe({
      next: (messages) => {
        console.log('🔍 ChatComponent: Messages loaded via service:', messages.length);
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Error loading messages:', error);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedPartner() || !this.currentUser()) return;

    const messageContent = this.newMessage.trim();
    this.newMessage = '';

    // Ensure current conversation is set
    this.chatService.setCurrentConversation(this.currentUser()!.id, this.selectedPartner()!.id);

    this.chatService.sendMessage(this.selectedPartner()!.id, messageContent).subscribe({
      next: (message) => {
        console.log('🔍 ChatComponent: Message sent successfully:', message);
        // Message will be added via socket event, so no need to manually add
      },
      error: (error) => {
        console.error('Error sending message:', error);
        // Restore message on error
        this.newMessage = messageContent;
      }
    });
  }

  getUnreadCountForPartner(partnerId: string): number {
    let unreadCount = 0;
    this.messages$.subscribe(messages => {
      unreadCount = messages.filter((msg: Message) =>
        msg.senderId === partnerId &&
        msg.receiverId === this.currentUser()?.id &&
        !msg.isRead
      ).length;
    }).unsubscribe();
    return unreadCount;
  }

  formatMessageTime(date: Date | string): string {
    const messageDate = new Date(date);
    const now = new Date();
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return messageDate.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}
