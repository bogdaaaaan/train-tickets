import Builder from "../persistence/Builder";

export default class Facade {
    createTicket (ticket) {
        let builder = new Builder();
        builder.setId(ticket.id);

        builder.setDispatchDate(ticket.dispatch_date);
        builder.setArrivalDate(ticket.arrival_date);

        builder.setDispatchPlace(ticket.dispatch_place);
        builder.setArrivalPlace(ticket.arrival_place);

        builder.setRaicarType(ticket.railcar_type);


        console.log(builder.getResult());
    }
}