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
  private readonly server: Server;

  constructor(private readonly messageService: MessagesService) {}

  async handleConnection(client: Socket) {
    this.messageService.getConnectedClientsCount(this.server);

    const messages = await this.messageService.findAll();

    client.emit('findAllMessage', messages);
  }

  handleDisconnect() {
    this.messageService.getConnectedClientsCount(this.server);
  }

  @SubscribeMessage('findAllMessage')
  async findAll(@ConnectedSocket() client: Socket) {
    const messages = await this.messageService.findAll();

    client.emit('findAllMessage', messages);
  }

  @SubscribeMessage('getConnectedClientsCount')
  async getConnectedClientsCount(@ConnectedSocket() client: Socket) {
    this.messageService.getConnectedClientsCount(this.server, client);
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    return this.messageService.create(createMessageDto, client, this.server);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(
      updateMessageDto.id,
      updateMessageDto,
      this.server
    );
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id, this.server);
  }
}
