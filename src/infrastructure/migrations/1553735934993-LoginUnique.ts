import { MigrationInterface, QueryRunner } from "typeorm";

export class LoginUnique1553735934993 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`
            alter table kicker_user add constraint login_unique unique (login);
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`
            alter table kicker_user drop constraint login_unique;
            `
		);
	}

}
