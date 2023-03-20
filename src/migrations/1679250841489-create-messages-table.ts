import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessagesTable1679250841489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'messages',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'text',
          type: 'varchar',
          default: `''`,
        },
        {
          name: 'sender',
          type: 'varchar',
          default: `''`,
        },
        {
          name: 'created_at',
          type: 'timestamptz',
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
