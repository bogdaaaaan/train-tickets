export default class Singleton {
    getvAvailableTickets = async (ticket) => {
        // const date_from = ticket.dispatch_date;
        // const date_to = ticket.arrival_date;

        // const place_from = ticket.dispatch_place;
        // const place_to = ticket.arrival_place;

        // const railcar_type = ticket.railcar_type;

        // console.log(date_from, date_to, place_from, place_to, railcar_type);
        const res = await fetch('/users');
        return res;
    }
}