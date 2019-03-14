import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1551558086922 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`
            CREATE TABLE "user" (
                id VARCHAR(40) primary key,
                login VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255),
                avatar VARCHAR(255)
            );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('DROP TABLE IF EXISTS "user"');
	}

}
