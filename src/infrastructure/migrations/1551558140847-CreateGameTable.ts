import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGameTable1551558140847 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query("");
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query("");
	}

}
