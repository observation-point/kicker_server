import {MigrationInterface, QueryRunner} from "typeorm";

export class RatingHistory1566412820088 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`create table rating_history (
                id VARCHAR(40) primary key,
								"gameId" VARCHAR(40) references game(id),
								"userId" VARCHAR(40) references kicker_user(id),
                value integer not null,
                "createdAt" timestamp with time zone default now()
            );
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`drop table rating_history;`
		);
	}

}
