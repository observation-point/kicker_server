import { MigrationInterface, QueryRunner } from "typeorm";

export class AddToken1555082842073 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table kicker_user
            add column token varchar(40);`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table kicker_user
            drop column token;`
		);
	}

}
