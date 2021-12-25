import Builder from '../persistence/Builder';
import DB from '../persistence/DB';
import ChainOfResponsibility from './ChainOfResponsibility';

export default class Facade {
    constructor() {
        this.database = new DB();
        this.builder = new Builder();
        this.handler = new ChainOfResponsibility(this.database);
    }

    async returnTicket(id) {
        await this.handler.returnTicket(id);
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

        const _ticket = this.builder.getTicket();
        
        await this.handler.removeTicket(_ticket.id);
        await this.handler.addUsedTicket(_ticket);
    }

    async requestAvailableTickets (ticket) {
        // database
        const res = await this.handler.getResponse();
        if (!res) return;
        const json = await this.handler.transformData(res);
        if (!json) return;
        
        // create filter
        this.builder.reset();
        this.builder.setDispatchDate(ticket.dispatch_date);
        this.builder.setArrivalDate(ticket.arrival_date);
        this.builder.setSource(ticket.source);
        this.builder.setDestination(ticket.destination);
        this.builder.setRaicarType(ticket.railcar_type);

        const filter = this.builder.getFilterData();
        const array = await this.handler.filterData(filter, json);
        if (!array) return;

        return array;
    }    
}