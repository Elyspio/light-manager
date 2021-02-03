export class NotImplementedException extends Error {
    constructor(message?: string) {
        super("Operation not supported" + message ? `: ${message}` : "");
    }

}
