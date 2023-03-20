import { IsString } from 'class-validator';
import { ICreateMessage } from '../interfaces/createMessage.interface';

export class CreateMessageDto implements ICreateMessage {
  @IsString()
  text: string;
}
