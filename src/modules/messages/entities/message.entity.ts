import { Column, Entity } from 'typeorm';
import { IdDateBaseEntity } from '../../../common/entity';
import { IMessage } from '../interfaces/message.interface';

@Entity({ name: 'messages' })
export class MessageEntity extends IdDateBaseEntity implements IMessage {
  @Column({ type: 'varchar' })
  public text: string;

  @Column({ type: 'varchar' })
  public sender: string;
}
