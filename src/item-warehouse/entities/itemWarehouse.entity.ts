import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Item } from '../../item/entities/item.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@ObjectType()
@Entity('item_warehouses')
export class ItemWarehouse {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  warehouseId: string;

  @Field()
  @Column()
  itemId: string;

  @Field()
  @Column()
  count: number;

  @ManyToOne(() => Item, (item) => item.item_wh, { primary: true })
  @JoinColumn({ name: 'itemId' })
  @Field(() => Item, { nullable: true })
  item: Item;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.wh_item, {
    primary: true,
  })
  @JoinColumn({ name: 'warehouseId' })
  @Field(() => Warehouse, { nullable: true })
  warehouse: Warehouse;
}
