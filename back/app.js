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
//définition des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')))

//utilisation des routes
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;