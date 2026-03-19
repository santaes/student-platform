import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
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

  async markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
    await this.messageRepository.update(
      { senderId: receiverId, receiverId: senderId, isRead: false },
      { isRead: true },
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.messageRepository.count({
      where: { receiverId: userId, isRead: false },
    });
  }

  async getChatPartners(userId: string): Promise<User[]> {
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

    const partners = new Set<User>();
    sentMessages.forEach(msg => partners.add(msg.receiver));
    receivedMessages.forEach(msg => partners.add(msg.sender));

    return Array.from(partners);
  }
}
