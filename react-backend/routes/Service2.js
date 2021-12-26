const express = require('express');
const { Int32 } = require('mongodb');
const router = express.Router();
const client = require('../Singleton');

async function getPriceList() {
    const arr = await client.db('services').collection('service2').find({}).toArray();
    return arr.map(el => {
        return {id: el.id, name: el.name, price: el.price};
    });
}

async function getDetails(id) {
    return await client.db('train_tickets').collection('tickets').find({"id": Int32(id)}).toArray();
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
    res.send('Service2');
});

/* GET price-list page. */
router.get('/price-list', function (req, res, next) {
    main(getPriceList, true)
        .catch(console.error)
        .then(tickets => {
            res.send(tickets);
        });
});

/* GET search page. */
router.get('/details/:id', function (req, res, next) {
    main(getDetails, true, req.params.id)
        .catch(console.error)
        .then(tickets => {
            res.send(tickets);
        });
});

module.exports = router;
