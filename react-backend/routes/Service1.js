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



async function generate() {
    const types = ['Купе', 'Плацкарт', 'Люкс'];
    const sources = ['Херсон', 'Київ', 'Львів'];
    for (let i = 0; i < 100000; i++) {
        const source = sources[Math.floor(Math.random()*(sources.length))];
        
        const dispatch_date = (Math.floor(Math.random()*15) + 1);
        
        const price = (Math.floor(Math.random()*500) + 1);

        let destination = sources[Math.floor(Math.random()*(sources.length))];
        while (source === destination) {
            destination = sources[Math.floor(Math.random()*(sources.length))];
        }

        const ticket = {
            id: i,
            train_id: Math.floor(Math.random()*6) + 1,
            railcar_num: Math.floor(Math.random()*10) + 1,
            railcar_type: types[Math.floor(Math.random()*(types.length))],
            seat:  Math.floor(Math.random()*30) + 1,
            dispatch_date: dispatch_date < 9 ? '2021-12-0' + dispatch_date : '2021-12-' + dispatch_date,
            arrival_date: '2021-12-' +  (Math.floor(Math.random()*(30 - 15)) + 15),
            source: source,
            destination: destination,
            price: price
        }

        const insert = await client.db('services').collection('service1').insertOne(ticket);
    }
}

router.get('/gen', async function (req, res, next) {
    main(generate, false)
        .catch(console.error)
        .then(() => {
            res.status(200).send('gen');
        });
});

module.exports = router;
