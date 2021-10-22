import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemWarehouse } from '../../item-warehouse/entities/itemWarehouse.entity';

@ObjectType()
@Entity('warehouse')
export class Warehouse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  // @Field(() => [Warehouse], { nullable: true })
  @OneToMany(() => ItemWarehouse, (iw) => iw.item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wh_item: ItemWarehouse[];
}
