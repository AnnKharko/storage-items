import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';

@ObjectType()
@Entity('user')
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column() // { select: false }
  password: string;

  // @OneToOne(() => Auth)
  // @Field(() => Auth)
  // authId: string;
}
