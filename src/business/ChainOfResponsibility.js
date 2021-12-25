import Specification from './Specification';

export default class ChainOfResponsibility {
    constructor(database) {
        this.database = database;
        this.filter = new Specification();
    }

    async getResponse() {
        return this.database.getvAvailableTickets().then(data => { 
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

    async transformData(data) {
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

    async filterData(filter, data) {
        return await this.filter.filterTickets(filter, data);
    }

    async removeTicket(id) {
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

    async addUsedTicket(ticket) {
        await this.database.addUsedTicket(ticket).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Додавання квитка не вдалось!');
                }
                return data;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }

    async returnTicket(id) {
        await this.database.returnTicket(id).then(data => {
            try {
                if (!data.ok) {
                    throw new Error('Повернення квитка не вдалось!');
                }
                return data;
            } catch (error) {
                console.log('Виникла помилка з запитом: ', error.message);
            };
        });
    }
}
