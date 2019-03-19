import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGameTable1552689962260 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`create table game (
                id VARCHAR(40) primary key,
                "startGame" timestamptz,
				"endGame" timestamptz,
				status VARCHAR(10) not null
            );
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`drop table game;`
		);
	}

}
