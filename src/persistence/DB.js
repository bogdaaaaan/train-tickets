import { SERVER_URL } from "../const";

export default class DB {
    getvAvailableTickets = async () => {
        return await fetch(SERVER_URL + '/tickets');
    }

    removeTicket = async (id) => {
        return await fetch(SERVER_URL + '/remove/' + id);
    }

    addUsedTicket = async (ticket) => {
        return await fetch(SERVER_URL + '/add', {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    addUser = async (user) => {
        return await fetch(SERVER_URL + '/user_add', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    returnTicket = async (id) => {
        return await fetch(SERVER_URL + '/return', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}