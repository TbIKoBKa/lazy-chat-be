import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  async create(data: CreateMessageDto, client: Socket, server: Server) {
    if (data.text) {
      const transformedData = {
        ...data,
        sender: client.id,
      };

      const createdMessage = await this.messageRepository
        .create(transformedData)
        .save();

      server.emit('createMessage', createdMessage);
    }

    return null;
  }

  async findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: number) {
    return this.messageRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto, server: Server) {
    const transformed = {
      ...updateMessageDto,
      updatedAt: new Date().toISOString(),
    };

    await this.messageRepository.update(
      {
        id,
      },
      transformed
    );

    server.emit('updateMessage', transformed);
  }

  async remove(id: number, server: Server) {
    await this.messageRepository.delete({
      id,
    });

    server.emit('removeMessage', { id });
  }

  async getConnectedClientsCount(server: Server, client?: Socket) {
    const sockets = await server.fetchSockets();

    if (client) {
      client.emit('getConnectedClientsCount', sockets.length);
    } else {
      server.emit('getConnectedClientsCount', sockets.length);
    }
  }
}
