import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    city!: string;

    // @Column('geometry', { spatialFeatureType: 'Point' })
    // @Index('store_location_idx', { spatial: true })
    @Column({ type: 'jsonb'})
    location!: string;

    @Column({ type: 'int'})
    availableMeals!: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    mealPrice!: number;

    @Column()
    rating!: number;

    @Column({ type: 'jsonb'})
    pickupHours!: {
        start: string;
        end: string;
    }

    @Column({ type: 'timestamp'})
    createdAt!: Date;

    @Column({ type: 'timestamp'})
    updatedAt!: Date;
}