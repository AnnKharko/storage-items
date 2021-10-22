import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemWarehouse } from '../../item-warehouse/entities/itemWarehouse.entity';

@ObjectType()
@Entity('item')
export class Item {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  // @Field(() => [Warehouse], { nullable: true })
  @OneToMany(() => ItemWarehouse, (iw) => iw.warehouse, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  item_wh: ItemWarehouse[];
}
