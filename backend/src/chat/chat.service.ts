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
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

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

    const partners = new Set<User>();
    sentMessages.forEach(msg => {
      console.log(`🔍 Backend: Adding receiver: ${msg.receiver.id} - ${msg.receiver.email}`);
      partners.add(msg.receiver);
    });
    receivedMessages.forEach(msg => {
      console.log(`🔍 Backend: Adding sender: ${msg.sender.id} - ${msg.sender.email}`);
      partners.add(msg.sender);
    });

    console.log(`🔍 Backend: Set size before filtering: ${partners.size}`);
    console.log('🔍 Backend: Set contents:', Array.from(partners).map(u => ({ id: u.id, email: u.email })));

    // Convert Set to Array and remove the current user if somehow included
    const partnersArray = Array.from(partners).filter(user => {
      const shouldInclude = user.id !== userId;
      console.log(`🔍 Backend: User ${user.id} - ${user.email}, include: ${shouldInclude}`);
      return shouldInclude;
    });

    console.log(`🔍 Backend: Final partners list: ${partnersArray.length} users`);
    console.log('🔍 Backend: Final partners:', partnersArray.map(p => ({ id: p.id, email: p.email })));
    return partnersArray;
  }
}
