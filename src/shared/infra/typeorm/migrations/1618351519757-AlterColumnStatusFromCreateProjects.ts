import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterColumnStatusFromCreateProjects1618351519757
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'projects',
      'status',
      new TableColumn({ name: 'status', type: 'boolean', default: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'projects',
      'status',
      new TableColumn({ name: 'status', type: 'boolean' })
    );
  }
}
