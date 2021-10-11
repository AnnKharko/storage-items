import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { ItemWarehouse } from '../../item-warehouse/entities/itemWarehouse.entity';

@ObjectType()
@Entity()
export class Warehouse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  // @Field(() => [Item], { nullable: true })
  // @Column()
  // wh_item: [Item];

  @OneToMany(() => ItemWarehouse, (iwh) => iwh.warehouse)
  itemConnection: Promise<ItemWarehouse[]>;
}
