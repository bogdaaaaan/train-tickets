import Builder from './Builder';
import DB from './DB';
import ChainOfResponsibility from './ChainOfResponsibility';

export default class Facade {
    constructor() {
        this.database = new DB();
        this.builder = new Builder();
        this.handler = new ChainOfResponsibility(this.database);
    }

    async reserveTicket(ticket) {
        // create ticket
        this.builder.reset();
        this.builder.set_id(ticket._id);
        this.builder.setId(ticket.id);
        this.builder.setDispatchDate(ticket.dispatch_date);
        this.builder.setArrivalDate(ticket.arrival_date);
        this.builder.setSource(ticket.source);
        this.builder.setDestination(ticket.destination);
        this.builder.setRaicarType(ticket.railcar_type);
        this.builder.setSeat(ticket.seat);
        this.builder.setRailcarNum(ticket.railcar_num);
        this.builder.setTrainId(ticket.train_id);
        this.builder.setPrice(ticket.price);

        const _ticket = this.builder.getTicket();

        await this.handler.removeTicketRequest(_ticket.id);
        await this.handler.reserveTicketRequest(_ticket);
    }

    async addUser(user) {
        await this.handler.addUserRequest(user);
    }

    async returnTicket(id) {
        await this.handler.returnTicketRequest(id);
    }

    async buyTicket(ticket) {
        // create ticket
        this.builder.reset();
        this.builder.set_id(ticket._id);
        this.builder.setId(ticket.id);
        this.builder.setDispatchDate(ticket.dispatch_date);
        this.builder.setArrivalDate(ticket.arrival_date);
        this.builder.setSource(ticket.source);
        this.builder.setDestination(ticket.destination);
        this.builder.setRaicarType(ticket.railcar_type);
        this.builder.setSeat(ticket.seat);
        this.builder.setRailcarNum(ticket.railcar_num);
        this.builder.setTrainId(ticket.train_id);
        this.builder.setPrice(ticket.price);

        const _ticket = this.builder.getTicket();

        await this.handler.removeTicketRequest(_ticket.id);
        await this.handler.addUsedTicketRequest(_ticket);
    }

    async requestAvailableTickets(ticket) {
        // create filter
        this.builder.reset();
        this.builder.setDispatchDate(ticket.dispatch_date);
        this.builder.setArrivalDate(ticket.arrival_date);
        this.builder.setSource(ticket.source);
        this.builder.setDestination(ticket.destination);
        this.builder.setRaicarType(ticket.railcar_type);

        const filter = this.builder.getFilterData();

        // database
        const res = await this.handler.getResponse(filter);
        if (!res) return;
        const json = await this.handler.transformDataRequest(res);
        if (!json) return;

        const array = await this.handler.filterDataRequest(filter, json);
        if (!array) return;

        return array;
    }
}
