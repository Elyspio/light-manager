export class LightNotFoundException extends Error {
    constructor(ip?: string) {
        super(`Could not found a light with ip=${ip ?? "undefined"}`);
    }
}
