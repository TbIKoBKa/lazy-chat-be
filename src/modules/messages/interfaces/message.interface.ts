import { IIdDateBase } from '../../../common/entity';

export interface IMessage extends IIdDateBase {
  text: string;
  sender: string;
}
