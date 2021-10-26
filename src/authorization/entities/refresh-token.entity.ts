import { Field, InputType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
@Entity('refreshToken')
export class RefreshToken {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  devId: string;

  @Field()
  @Column()
  is_revoked: boolean;

  @Field()
  @Column()
  expires: Date;
}
