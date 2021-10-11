import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemWarehouse } from '../../item-warehouse/entities/itemWarehouse.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@ObjectType()
@Entity('item')
export class Item {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  //   @ManyToMany(() => Warehouse, (warehouse) => warehouse.id, {
  //     cascade: true,
  //   })
  //   @JoinTable()
  //   warehouses: Warehouse[];

  @Field(() => [Warehouse], { nullable: true })
  @OneToMany(() => ItemWarehouse, (iw) => iw.item)
  item_wh: ItemWarehouse[];

  // @OneToMany(() => ItemWarehouse, (iwh) => iwh.item)
  // warehouseConnection:ItemWarehouse[]>;
}
