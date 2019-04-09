import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWinnerColumnInGameTable1554463535273 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table game
            add column winner varchar(10);`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table game
            drop column winner;`
		);
	}

}
