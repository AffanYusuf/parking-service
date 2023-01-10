import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateParkingsTable1673294792597 implements MigrationInterface {
    name = 'CreateParkingsTable1673294792597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."parkings_vehicletype_enum" AS ENUM('CAR', 'MOTORCYCLE')`);
        await queryRunner.query(`CREATE TABLE "parkings" ("id" SERIAL NOT NULL, "vehicleType" "public"."parkings_vehicletype_enum" NOT NULL DEFAULT 'MOTORCYCLE', "vehicleNumber" character varying NOT NULL, "checkIn" TIMESTAMP NOT NULL, "checkOut" TIMESTAMP NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ff5851f221bd241a0e959403f9b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "parkings"`);
        await queryRunner.query(`DROP TYPE "public"."parkings_vehicletype_enum"`);
    }

}
