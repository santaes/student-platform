import { Controller, Get, Post, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('partners')
  @ApiOperation({ summary: 'Get chat partners' })
  @ApiResponse({ status: 200, description: 'Chat partners retrieved successfully' })
  async getChatPartners(@Request() req) {
    return this.chatService.getChatPartners(req.user.id);
  }

  @Get('messages/:userId')
  @ApiOperation({ summary: 'Get messages between users' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  async getMessages(@Param('userId') userId: number, @Request() req) {
    return this.chatService.getMessagesBetweenUsers(req.user.id, userId);
  }

  @Post('messages/:userId')
  @ApiOperation({ summary: 'Send message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async sendMessage(
    @Param('userId') userId: number,
    @Body() body: { content: string },
    @Request() req
  ) {
    return this.chatService.sendMessage(req.user.id, userId, body.content);
  }

  @Post('messages/:userId/read')
  @ApiOperation({ summary: 'Mark messages as read' })
  @ApiResponse({ status: 200, description: 'Messages marked as read' })
  async markAsRead(@Param('userId') userId: number, @Request() req) {
    await this.chatService.markMessagesAsRead(req.user.id, userId);
    return { success: true };
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Get unread messages count' })
  @ApiResponse({ status: 200, description: 'Unread count retrieved successfully' })
  async getUnreadCount(@Request() req) {
    const count = await this.chatService.getUnreadCount(req.user.id);
    return { count };
  }
}
