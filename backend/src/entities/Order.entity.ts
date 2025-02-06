import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entitiy";
import { Store } from "./Store.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Store)
    store!: Store;

    @Column()
    quantity!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    totalPrice!: number;

    @Column()
    status!: 'pending' | 'confirmed' | 'cancelled';

    @Column()
    paymentId!: string;
    
    @Column({ type: 'timestamp'})
    createdAt!: Date;

    @Column({ type: 'timestamp'})
    updatedAt!: Date;

}
