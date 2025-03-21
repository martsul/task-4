export class NoAvailable extends Error {
    constructor() {
        super("User is blocked");
    }
}
