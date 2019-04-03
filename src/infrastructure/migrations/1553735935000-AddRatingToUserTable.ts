import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRatingToUserTable1553735935000 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table kicker_user add column rating integer DEFAULT 1500;`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`alter table kicker_user drop column rating;`
		);
	}
}
