import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsEmail } from "class-validator"

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() username: string;
  @Column({nullable: true}) password: string;  // может иметь значение null
  @Column() ip: string;
  @Column({nullable: true}) phone: string;
  @IsEmail()       // Это дополинтельная валидация на поле email, что оно таки email.
  @Column({nullable: true}) email: string;
};

//export class User {}
