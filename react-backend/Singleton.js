const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.phfl5.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

module.exports = client;