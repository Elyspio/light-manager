import {Light} from "./light";
import {EventEmitter} from "events";
// import {Mutex} from "async-mutex";
import {$log} from "@tsed/common";
import {refreshRate} from "../../../config/light/lights";
import {discover} from "./discover";
import {CustomSet} from "../../data/CustomSet";


// const mutex = new Mutex();

export interface LightManager {
    get(): Light[];

    get(id: number): Light;

    get(ip: string): Light;
}


export class LightManager extends EventEmitter {
    public static events = {
        newLight: "NEW_LIGHT",
        refreshLight: "REFRESH_LIGHT",
    };

    private readonly lights: CustomSet<Light>;

    private constructor() {
        super();
        this.lights = new CustomSet<Light>({lock: false});
        const self = this;
        discover()

        setTimeout(() => {
            setInterval(() => {
                self.refresh();
            }, refreshRate);
        }, 1000);
    }

    private static _instance: LightManager;

    public static get instance() {
        if (!this._instance) {
            this._instance = new LightManager();
        }

        return this._instance;
    }


    public get(idOrIp?: number | string) {
        if (idOrIp === undefined) {
            return this.lights.toArray().sort((a, b) => (a.ip < b.ip ? -1 : 1));
        }

        if (typeof idOrIp === "string") {
            return this.lights.toArray().find((l) => l.ip === idOrIp);
        }

        if (typeof idOrIp === "number") {
            return this.lights.toArray().find((l) => l.id === idOrIp);
        }
    }

    public async addLight(data: Pick<Light, "id" | "ip" | "port">) {
        let refresh = false;
        if (!this.lights.toArray().map((l) => l.ip).includes(data.ip)) {
            this.lights.add(
                await Light.get(data.id.toString(), data.ip, data.port)
            );
            $log.info("added", data);
            refresh = true;
        }

        if (refresh) {
            this.emit(LightManager.events.newLight, this.lights);
            $log.info("EMIT");
        }
    }

    private async refresh() {
        $log.info("refresh");

        await Promise.all(this.lights.toArray().map(async light => {
            if (await light.refresh()) {
                this.emit(LightManager.events.refreshLight, light.ip);
                console.log("refresh light", light.ip);
            }
        }))
    }
}
