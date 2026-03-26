import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMessagesBetweenUsers(userId1: number, userId2: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
      relations: ['sender.studentProfile', 'receiver.studentProfile'],
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
    const sender = await this.userRepository.findOne({ 
      where: { id: senderId },
      relations: ['studentProfile']
    });
    const receiver = await this.userRepository.findOne({ 
      where: { id: receiverId },
      relations: ['studentProfile']
    });

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      content,
      sender,
      senderId,
      receiver,
      receiverId,
    });

    return this.messageRepository.save(message);
  }

  async markMessagesAsRead(senderId: number, receiverId: number): Promise<void> {
    await this.messageRepository.update(
      { senderId: receiverId, receiverId: senderId, isRead: false },
      { isRead: true },
    );
  }

  async getUnreadCount(userId: number): Promise<number> {
    return this.messageRepository.count({
      where: { receiverId: userId, isRead: false },
    });
  }

  async getChatPartners(userId: number): Promise<User[]> {
    console.log(`🔍🔍🔍 Backend: getChatPartners called with userId: ${userId}`);
    
    const sentMessages = await this.messageRepository.find({
      where: { senderId: userId },
      relations: ['receiver'],
      select: ['receiver'],
    });

    const receivedMessages = await this.messageRepository.find({
      where: { receiverId: userId },
      relations: ['sender'],
      select: ['sender'],
    });

    console.log(`🔍 Backend: Found ${sentMessages.length} sent messages, ${receivedMessages.length} received messages`);
    console.log('🔍 Backend: Sent messages receivers:', sentMessages.map(m => ({ id: m.receiver.id, email: m.receiver.email })));
    console.log('🔍 Backend: Received messages senders:', receivedMessages.map(m => ({ id: m.sender.id, email: m.sender.email })));

    // Use Map with user ID as key to ensure uniqueness
    const partners = new Map<number, User>();
    sentMessages.forEach(msg => {
      console.log(`🔍 Backend: Adding receiver: ${msg.receiver.id} - ${msg.receiver.email}`);
      if (msg.receiver.id !== userId) {
        partners.set(msg.receiver.id, msg.receiver);
      }
    });
    receivedMessages.forEach(msg => {
      console.log(`🔍 Backend: Adding sender: ${msg.sender.id} - ${msg.sender.email}`);
      if (msg.sender.id !== userId) {
        partners.set(msg.sender.id, msg.sender);
      }
    });

    console.log(`🔍 Backend: Map size: ${partners.size}`);
    console.log('🔍 Backend: Map contents:', Array.from(partners.values()).map(u => ({ id: u.id, email: u.email })));

    // Convert Map values to Array
    const partnersArray = Array.from(partners.values());

    console.log(`🔍 Backend: Final partners list: ${partnersArray.length} users`);
    console.log('🔍 Backend: Final partners:', partnersArray.map(p => ({ id: p.id, email: p.email })));
    return partnersArray;
  }
}
