const express = require('express');
const { Int32, ObjectId } = require('mongodb');
const router = express.Router();
const client = require('../Singleton');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

async function listTickets(filter) {
    const ticketsList = await client.db('train_tickets').collection('tickets').find(filter).toArray();
    const ticketsList1 = await client.db('services').collection('service1').find(filter).toArray();
    const ticketsList2 = await client.db('services').collection('service2').find(filter).toArray();

//    const data = Promise.all([ticketsList, ticketsList1, ticketsList2]);
    console.log(ticketsList.length,ticketsList1.length,ticketsList2.length)
    const result = ticketsList.concat(ticketsList1, ticketsList2);
    return result;
}

async function removeTicket({id, db, collection}) {
    await client.db(db).collection(collection).deleteOne({ id: Int32(id) });
}

async function addTicket({ticket, db, collection}) {
    await client.db(db).collection(collection).insertOne(ticket);
}

async function addUser({user, db, collection}) {
    const is_user = await client.db(db).collection(collection).find({"user_id": user.user_id}).toArray();
    if (!is_user.length) {
        await client.db(db).collection(collection).insertOne(user)
    };
}

async function returnTicket({id, db, collection_from, collection_to}) {
    const ticket = await client.db(db).collection(collection_from).findOne({ "id": Int32(id) });
    if (ticket) {
        ticket._id = ObjectId(ticket._id);
        await client.db(db).collection(collection_to).insertOne(ticket);
        await client.db(db).collection(collection_from).deleteOne({ "id": Int32(id) });
    }
    return ticket;
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


/* GET tickets listing. */
router.post('/tickets', function (req, res, next) {
    let filter = {};

    filter.dispatch_date = String(req.body.dispatch_date);
    filter.arrival_date = String(req.body.arrival_date);
    filter.source = String(req.body.source);
    filter.destination = String(req.body.destination);
    if (req.body.railcar_type && req.body.railcar_type !== 'None') filter.railcar_type = String(req.body.railcar_type);

    main(listTickets, true, filter)
        .catch(console.error)
        .then(tickets => {
            res.send(tickets);
        });
});

// remove ticket by id
router.get('/remove/:id', function (req, res, next) {
    main(removeTicket, false, {id: req.params.id, db: 'train_tickets', collection: 'tickets'})
        .catch(console.error)
        .then(() => {
            res.status(200).send('Removed element with id ' + req.params.id + '!');
        });
});

// add ticket to used
router.post('/add', function (req, res, next) {
    main(addTicket, false, {ticket: req.body, db: 'train_tickets', collection: 'tickets_in_use'})
        .catch(console.error)
        .then(() => {
            main(removeTicket, false, {id: req.body.id, db: 'train_tickets', collection: 'reserved_tickets'})
            .catch(console.error)
            .then(() => {
                res.status(200).send('Removed element from reserved tickets!');
            });
    });
    
});

// reserve ticket
router.post('/reserve', function (req, res, next) {
    main(addTicket, false, {ticket: req.body, db: 'train_tickets', collection: 'reserved_tickets'})
        .catch(console.error)
        .then(() => {
            res.status(200).send('Added element to used tickets!');
            setTimeout(() => {
                main(removeTicket, false, {id: req.body.id, db: 'train_tickets', collection: 'reserved_tickets'})
                .catch(console.error)
                .then(() => {console.log('ticket ' + req.body.id + ' was removed from reserved')});
            }, 300000);
        });
    
});

// remove ticket by id from used and add to available
router.post('/return', function (req, res, next) {
    main(returnTicket, true, {id: req.body.id, db: 'train_tickets', collection_from: 'tickets_in_use', collection_to: 'tickets'})
        .catch(console.error)
        .then(() => {
            res.status(200).send('All ok!');
        });
});

// add user
router.post('/user_add', function (req, res, next) {
    main(addUser, false, {user: req.body, db: 'train_tickets', collection: 'users'})
        .catch(console.error)
        .then(() => {
            res.status(200).send('All ok!');
        });
});




// async function generate() {
//     const types = ['Купе', 'Плацкарт', 'Люкс'];
//     const sources = ['Херсон', 'Київ', 'Львів'];
//     for (let i = 0; i < 100; i++) {
//         const _id = i < 10 ?  ObjectId("61c3308f44c33fc994111c0" + i) :  ObjectId("61c3308f44c33fc994111c" + i);
//         const source = sources[Math.floor(Math.random()*(sources.length))];
        
//         const dispatch_date = (Math.floor(Math.random()*15) + 1);
        
//         const price = (Math.floor(Math.random()*500) + 1);

//         let destination = sources[Math.floor(Math.random()*(sources.length))];
//         while (source === destination) {
//             destination = sources[Math.floor(Math.random()*(sources.length))];
//         }

//         const ticket = {
//             _id: _id,
//             id: i,
//             train_id: Math.floor(Math.random()*6) + 1,
//             railcar_num: Math.floor(Math.random()*10) + 1,
//             railcar_type: types[Math.floor(Math.random()*(types.length))],
//             seat:  Math.floor(Math.random()*30) + 1,
//             dispatch_date: dispatch_date < 9 ? '2021-12-0' + dispatch_date : '2021-12-' + dispatch_date,
//             arrival_date: '2021-12-' +  (Math.floor(Math.random()*(30 - 15)) + 15),
//             source: source,
//             destination: destination,
//             price: price
//         }

//         const insert = await client.db('train_tickets').collection('tickets').insertOne(ticket);
//         console.log('');
//     }
// }

// router.get('/gen', async function (req, res, next) {
//     main(generate, false)
//         .catch(console.error)
//         .then(() => {
//             res.status(200).send('gen');
//         });
// });


module.exports = router;
