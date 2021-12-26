const express = require('express');
const { Int32 } = require('mongodb');
const router = express.Router();
const client = require('../Singleton');

// function to list all tickets from service 1
async function listTickets(filters) {
    // if there isnt filters to search with return all data 
    if (!filters) return await client.db('services').collection('service1').find({}).toArray(); 
    
    // remake data to fit 
    for (const key in filters) {
        if (Object.hasOwnProperty.call(filters, key)) {
            const element = filters[key];
            if (Number.isInteger(Number(element)) && element) filters[key] = Int32(element);
        }
    }

    // get list with filters
    const ticketsList = await client.db('services').collection('service1').find(filters).toArray();
    // return only filtered data + price
    const result = ticketsList.map(el => {
        let obj = {};
        obj.price = el.price;
        for (const key in filters) {
            if (Object.hasOwnProperty.call(filters, key)) obj[key] = el[key];
        }
        return obj;
    })
    return result;
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
    const start = Date.now();
    const list_of_filters = Object.entries(req.query);
    if (list_of_filters.length === 0) {
        main(listTickets, true)
            .catch(console.error)
            .then(tickets => {
                // implement delay
                const duration = Date.now() - start;
                console.log(duration/1000);
                setTimeout(() => {
                    res.send(tickets);
                }, (25000-duration));
            });
    } else {
        main(listTickets, true, Object.fromEntries(list_of_filters))
            .catch(console.error)
            .then(tickets => {
                // implement delay
                const duration = Date.now() - start;
                console.log(duration/1000);
                setTimeout(() => {
                    res.send(tickets);
                }, (25000-duration));
            });
    }
    
});

module.exports = router;