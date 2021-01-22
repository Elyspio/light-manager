import {Comparable} from "./Comparable";

let mutex = {
    locked: false
}


export class CustomSet<T extends Comparable<T>> {
    private content: Array<T>

    constructor(private options?: { data?: Iterable<T>, lock?: boolean }) {
        this.content = new Array<T>(...(this.options?.data ?? []));
    }

    add(obj: T) {
        if (this.options?.lock) {
            mutex.locked = true;
            while (mutex.locked) {
            }
        }

        if (!this.contains(obj)) {
            this.content.push(obj)
        }

        if (this.options?.lock) {
            mutex.locked = false;
        }
    }

    contains(obj: T): boolean {
        if (this.options?.lock) {
            mutex.locked = true;
            while (mutex.locked) {
            }
        }

        const found = this.content.find(x => x.equal(obj)) !== undefined;

        if (this.options?.lock) {
            mutex.locked = false;
        }

        return found;
    }

    toArray() {
        return [...this.content]
    }

    remove(obj: T) {
        if (this.options?.lock) {
            mutex.locked = true;
            while (mutex.locked) {
            }
        }

        this.content = this.content.filter(f => f.equal(obj));

        if (this.options?.lock) {
            mutex.locked = false;
        }
    }


}
