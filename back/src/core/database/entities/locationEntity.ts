import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import {UserEntity} from "./userEntity";


@Entity({name: "location"})
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "double precision"})
    latitude!: number;

    @Column({type: "double precision"})
    longitude!: number;

    @Column({type: "double precision"})
    altitude!: number | null;

    @Column({nullable: true, type: "double precision"})
    accuracy!: number | null;

    @Column({nullable: true, type: "double precision", name: "altitude_accuracy"})
    altitudeAccuracy!: number | null;

    @Column({nullable: true, type: "double precision"})
    heading!: number | null;

    @Column({nullable: true, type: "double precision"})
    speed!: number | null;

    @Column({nullable: true, type: "double precision"})
    timestamp!: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({name: "user_id"})
    user!: UserEntity;
}


