import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessagesService } from './messages.service';

@ApiTags('message')
@Controller('message')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get('/')
  public getMessages() {
    return this.messageService.findAll();
  }
}
