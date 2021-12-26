export default class Specification {
    async filterTickets (ticket, list) {
        if (!list.length) return new Error('Список даних пустий!');
        const date_from = ticket.dispatch_date;
        const date_to = ticket.arrival_date;

        const place_from = ticket.source;
        const place_to = ticket.destination;

        const railcar_type = ticket.railcar_type;

        let res = [];
        list.map(el => {
            if (el.arrival_date === date_to && el.dispatch_date === date_from && el.destination === place_to && el.source === place_from) {
                if (railcar_type && railcar_type !== 'None') {
                    if (el.railcar_type === railcar_type) {
                        res.push(el);
                    }
                } else {
                    res.push(el);
                }
            }
            return el;
        })
        return res;
    }
}