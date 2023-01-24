import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('Sources')
export class SourceEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() comment: string;
    @Column() date: string;
    @Column() link: string;
    //@Column() user_id: number;
    @ManyToOne(() => UserEntity, (users: UserEntity) => users.id, {
     onUpdate: 'CASCADE',
     onDelete: 'CASCADE',
   })
   users: UserEntity
}
