const express = require('express');
const { Int32 } = require('mongodb');
const router = express.Router();
const client = require('../Singleton');

async function getPriceList(page_num) {
    let arr = [];
    if (page_num) {
        arr = await client.db('services').collection('service2').find({}).skip(5000 * page_num).limit(5000).toArray();
    } else {
        arr = await client.db('services').collection('service2').find({}).limit(5000).toArray();
    }
    
    return arr.map(el => {
        return {id: el.id, name: el.source + ' - ' + el.destination, price: el.price};
    });
}

async function getDetails(id) {
    return await client.db('services').collection('service2').find({"id": Int32(id)}).toArray();
}

async function getDetailsByPage(page_num) {
    if (page_num) {
        return await client.db('services').collection('service2').find({}).skip(5000 * page_num).limit(5000).toArray();
    } else {
        return await client.db('services').collection('service2').find({}).limit(5000).toArray();
    }
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
router.get('/price-list/', function (req, res, next) {
    main(getPriceList, true)
        .catch(console.error)
        .then(tickets => {
            res.send(tickets);
        });
});

/* GET price-list page. */
router.get('/price-list/:page', function (req, res, next) {
    let page_num = 0;
    if (req.params.page) page_num = req.params.page;
    main(getPriceList, true, page_num)
        .catch(console.error)
        .then(tickets => {
            res.send(tickets);
        });
});

/* GET search page. */
router.get('/details/page/:page', function (req, res, next) {
    main(getDetailsByPage, true, req.params.page)
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
