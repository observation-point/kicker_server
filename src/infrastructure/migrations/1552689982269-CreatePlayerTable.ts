import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePlayerTable1552689982269 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`create table player (
                id VARCHAR(40) primary key,
                "userId" VARCHAR(40) references kicker_user(id),
                "gameId" VARCHAR(40) references game(id),
                side VARCHAR(5) not null,
                role VARCHAR(10) not null
            );
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`drop table player;
            `
		);
	}

}
