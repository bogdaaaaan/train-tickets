import Singleton from '../persistence/Singleton';

export default class Facade {
    constructor() {
        this.database = new Singleton();
    }

    async requestAvailableTickets (ticket) {
        const res = await this.database.getvAvailableTickets(ticket);
        return res;
    }
}