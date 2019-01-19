'use strict'

let req = require("express");
let express = req();
const MongoClient = require('mongodb').MongoClient;
let config = require('./config/development');
let winston = require('./config/winston');
let morgan = require('morgan');
express.use(morgan('combined', { stream: winston.stream }));
// log.warn("Byeeeeeeeeeeeeeeeeeeeeeeeeeee");
// console.log("abcabc!" + abc)

express.listen(3000);
// Connection URL
const url = 'mongodb://localhost:27017';

let dbName = config.db.mongo.db;
console.log("Connected Successfully!" + dbName)

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    let db = client.db(dbName);
    express.listen(6040);
    // const collection = db.collection('logging');
    // collection.insert(log.info("hiiiiiiiiiiiiiiiiiiiiiiiiii"), function (err, result) {
    //     log.info({"result" : result, "error" : err})
    // })
});

