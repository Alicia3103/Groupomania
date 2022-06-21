const express = require("express");

const helmet = require("helmet");
const path = require('path');
const app = express();

app.use((req, res, next) => {
    //acceder a l'api
    res.setHeader('Access-Control-Allow-Origin', '*')
    // headers possible
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //methode
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION')
    next()
});
const db = require("./database/DB")

module.exports = app;