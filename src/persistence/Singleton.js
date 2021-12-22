import { SERVER_URL } from "../const";
export default class Singleton {
    getvAvailableTickets = async () => {
        const res = await fetch(SERVER_URL + '/tickets');
        const tickets = await res.json();
        return tickets;
    }
}