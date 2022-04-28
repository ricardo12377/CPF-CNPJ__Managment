import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class status1651086464085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "status",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isUnique: true
                    },
                    {
                        name: "message",
                        type: "varchar",
                        isNullable: false
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
