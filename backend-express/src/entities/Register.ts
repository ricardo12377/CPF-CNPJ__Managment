import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Register {

    @PrimaryColumn()
    id: string;

    @Column()
    code: string;

    @Column({default: false})
    isBlocked: boolean;

    @Column()
    type: string

    @CreateDateColumn({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
      })
      creationAt: Date;
      
      @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
      updatedAt: Date;

      constructor(){
        if(!this.id) {
          this.id = uuid()
        }
      }
}