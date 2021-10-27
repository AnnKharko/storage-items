import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  gender: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column() // { select: false }
  password: string;

  @Field(() => String)
  @Column()
  role: string;

  @Field(() => String)
  @Column({ default: 'pending' })
  status: string;

  @Field(() => String)
  @Column({ select: false, nullable: true })
  confirm_token?: string;
}
