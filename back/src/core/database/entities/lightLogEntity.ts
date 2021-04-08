import {Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/schema";


export enum LogAction {
    ChangeColor = "CHANGE_COLOR",
    ChangeState = "CHANGE_STATE",
    ChangeBrightness = "CHANGE_BRIGHTNESS",
    Toggle = "TOGGLE",
    LightDetection = "LIGHT_DETECTION"
}


@Entity({name: "light-logging"})
export class LightLogEntity {
    @PrimaryGeneratedColumn()
    @Property(Number)
    id!: number;

    @Column({type: "varchar", name: "user_ip"})
    userIp!: string

    @Column({type: "timestamp"})
    date!: Date


    @Column({type: "varchar", name: "light_ip"})
    lightIp!: string

    @Column({enum: LogAction, name: "action_type", type: "enum", nullable: true})
    actionType!: LogAction | null


    @Column({type: "varchar", name: "action_value"})
    actionValue!: string


}

