import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  refreshToken: string;

  @Column({ unique: true })
  accessToken: string;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  user: UserEntity;
}
