import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class RelationUserProject1617272238163
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_projects',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'proj_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_USERS',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_PROJECTS',
            columnNames: ['proj_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_projects');
  }
}
