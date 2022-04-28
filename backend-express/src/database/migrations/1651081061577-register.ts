import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class register1651081061577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "register",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isUnique: true
                    },
                    {
                        name: "code",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "isBlocked",
                        type: "boolean",
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "creation_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("register")
    }

}
