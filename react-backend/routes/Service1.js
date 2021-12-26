const express = require('express');
const { Int32, ObjectId } = require('mongodb');
const router = express.Router();
const client = require('../Singleton');

async function listTickets(filters) {
    if (!filters) {
        const ticketsList = await client.db('train_tickets').collection('tickets').find({}).toArray();
        return ticketsList;
    } 
    
    for (const key in filters) {
        if (Object.hasOwnProperty.call(filters, key)) {
            const element = filters[key];
            if (Number.isInteger(Number(element)) && element) {
                filters[key] = Int32(element);
            }
        }
    }


    console.log(filters);
    const ticketsList = await client.db('train_tickets').collection('tickets').find(filters).toArray();
    return ticketsList;
}

async function main(_function, _return, _params) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        if (_return) {
            const tickets = await _function(_params);
            return tickets;
        } else {
            await _function(_params);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Service1');
});

/* GET search page. */
router.get('/search', function (req, res, next) {
    const list_of_filters = Object.entries(req.query);
    if (list_of_filters.length === 0) {
        main(listTickets, true)
            .catch(console.error)
            .then(tickets => {
                res.send(tickets);
            });
    } else {
        main(listTickets, true, Object.fromEntries(list_of_filters))
            .catch(console.error)
            .then(tickets => {
                res.send(tickets);
            });
    }
    
});

module.exports = router;