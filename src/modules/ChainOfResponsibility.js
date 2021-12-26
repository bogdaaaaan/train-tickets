import Specification from './Specification';

export default class ChainOfResponsibility {
    constructor(database) {
        this.database = database;
        this.filter = new Specification();
    }

    async getResponse(filter) {
        return this.database.getvAvailableTickets(filter).then(data => { 
            try {
                if (!data.ok) {
                    throw new Error('Відповідь не була отримана');
                }
                return data;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }

    async transformDataRequest(data) {
        return data.json().then(json => {
            try {
                if (!json) {
                    throw new Error('відповідь не була перетворена в дані');
                }
                return json;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        })
    }

    async filterDataRequest(filter, data) {
        return await this.filter.filterTickets(filter, data);
    }

    async addUserRequest(user) {
        await this.database.addUser(user).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Додавання нового користувача не вдалось!');
                }
                return data;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        })
    }

    async removeTicketRequest(id) {
        await this.database.removeTicket(id).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Видалення квитка не вдалось!');
                }
                return data;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }

    async addUsedTicketRequest(ticket) {
        await this.database.addUsedTicket(ticket).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Додавання квитка не вдалось!');
                }                
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }

    async reserveTicketRequest(ticket) {
        await this.database.reserveTicket(ticket).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Резервування квитка не вдалось!');
                }                
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }

    async returnTicketRequest(id) {
        return await this.database.returnTicket(id).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Повернення квитка не вдалось!');
                }
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }
}
