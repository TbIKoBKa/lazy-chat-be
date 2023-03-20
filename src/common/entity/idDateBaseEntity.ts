import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

export interface IIdDateBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class IdDateBaseEntity extends BaseEntity implements IIdDateBase {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp with time zone' })
  public createdAt: string = new Date().toISOString();

  @Column({ type: 'timestamp with time zone' })
  public updatedAt: string = new Date().toISOString();
}
