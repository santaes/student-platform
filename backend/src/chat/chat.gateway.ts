import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers = new Map<number, Socket>();

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    
    // Extract userId from query or auth token
    const userId = client.handshake.query.userId as string;
    if (userId) {
      const userIdNum = parseInt(userId);
      this.connectedUsers.set(userIdNum, client);
      console.log(`User ${userIdNum} connected with socket ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    
    // Remove user from connected users
    for (const [userId, socket] of this.connectedUsers.entries()) {
      if (socket.id === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { receiverId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const senderId = this.getUserIdBySocket(client);
      if (!senderId) {
        client.emit('error', { message: 'User not authenticated' });
        return;
      }

      // Save message to database
      const message = await this.chatService.sendMessage(senderId, data.receiverId, data.content);

      // Send to receiver if online
      const receiverSocket = this.connectedUsers.get(data.receiverId);
      if (receiverSocket) {
        receiverSocket.emit('newMessage', {
          id: message.id,
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          createdAt: message.createdAt,
        });
      }

      // Send confirmation to sender
      client.emit('messageSent', {
        id: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        createdAt: message.createdAt,
      });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { senderId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const receiverId = this.getUserIdBySocket(client);
      if (!receiverId) {
        client.emit('error', { message: 'User not authenticated' });
        return;
      }

      await this.chatService.markMessagesAsRead(data.senderId, receiverId);

      // Notify sender that messages were read
      const senderSocket = this.connectedUsers.get(data.senderId);
      if (senderSocket) {
        senderSocket.emit('messagesRead', { receiverId });
      }
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('getUnreadCount')
  async handleGetUnreadCount(@ConnectedSocket() client: Socket) {
    try {
      const userId = this.getUserIdBySocket(client);
      if (!userId) {
        client.emit('error', { message: 'User not authenticated' });
        return;
      }

      const count = await this.chatService.getUnreadCount(userId);
      client.emit('unreadCount', { count });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  private getUserIdBySocket(client: Socket): number | null {
    for (const [userId, socket] of this.connectedUsers.entries()) {
      if (socket.id === client.id) {
        return userId;
      }
    }
    return null;
  }
}
