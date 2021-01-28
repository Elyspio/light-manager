import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/schema";
import {LocationEntity} from "./locationEntity";


@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    @Property(Number)
    id!: number;

    @Column({type: "varchar"})
    name!: string

    @ManyToOne(() => LocationEntity, location => location.id)
    @JoinColumn({name: "last_location_id"})
    lastLocation!: LocationEntity;

    @OneToMany(() => LocationEntity, location => location.user)
    locations!: []
}


