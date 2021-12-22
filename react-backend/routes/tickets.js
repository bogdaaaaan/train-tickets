const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');

async function listTickets(client) {
    const ticketsList = await client.db("train_tickets").collection("tickets").find({}).toArray();
    return ticketsList;
}

async function main(client) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const tickets = await listTickets(client);
        return tickets;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/* GET tickets listing. */
router.get('/', function (req, res, next) {

    const uri = 'mongodb+srv://admin:admin@cluster0.phfl5.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    main(client).catch(console.error).then(tickets => {
        res.send(tickets);
    });
});

module.exports = router;
