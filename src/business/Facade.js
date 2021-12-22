import Builder from '../persistence/Builder';
import Singleton from '../persistence/Singleton';
import Specification from './Specification';

export default class Facade {
    constructor() {
        this.database = new Singleton();
        this.builder = new Builder();
        this.filter_by = new Specification();
    }

    async requestAvailableTickets (ticket) {
        const res = await this.database.getvAvailableTickets();
        const filtered_res = await this.filterTickets(ticket, res);
        return filtered_res;
    }

    async filterTickets (ticket) {
        // const date_from = ticket.dispatch_date;
        // const date_to = ticket.arrival_date;

        // const place_from = ticket.dispatch_place;
        // const place_to = ticket.arrival_place;

        // const railcar_type = ticket.railcar_type;

        // console.log(date_from, date_to, place_from, place_to, railcar_type);
    }
}