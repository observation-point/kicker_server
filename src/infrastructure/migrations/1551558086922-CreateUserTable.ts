import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1551558086922 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`
            CREATE TABLE kicker_user (
                id VARCHAR(40) primary key,
                login VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                fullname VARCHAR(255) NOT NULL,
                rating integer DEFAULT 1500,
                avatar VARCHAR(255),
                CONSTRAINT unique_login UNIQUE(login)
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('DROP TABLE IF EXISTS "kicker_user"');
	}

}
