import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGoalTable1552693016154 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`create table goal (
                id VARCHAR(40) primary key,
                game_id VARCHAR(40) references game(id),
                side VARCHAR(5) not null,
                time timestamptz not null
            );
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`create table goal;`
		);
	}

}
