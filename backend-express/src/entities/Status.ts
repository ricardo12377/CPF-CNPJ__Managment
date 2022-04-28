import { Entity, Column, PrimaryColumn,} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Status {

    @PrimaryColumn()
    id: string;

    @Column()
    message: string;

      constructor(){
        if(!this.id) {
          this.id = uuid()
        }
      }
}