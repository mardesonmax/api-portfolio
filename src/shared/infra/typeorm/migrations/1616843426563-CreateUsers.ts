import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export class CreateUsers1616843426563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: uuid(),
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashSync('123456', 8),
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
