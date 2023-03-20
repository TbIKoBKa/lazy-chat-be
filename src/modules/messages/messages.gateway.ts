import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: '*',
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const createdMessage = await this.messageService.create(createMessageDto);

    this.server.sockets.emit('createMessage', createdMessage);
  }

  @SubscribeMessage('findAllMessage')
  async findAll(@ConnectedSocket() client: Socket) {
    const messages = await this.messageService.findAll();

    client.emit('findAllMessage', messages);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
}
