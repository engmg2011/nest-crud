import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number;

  @Column()
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;


}
