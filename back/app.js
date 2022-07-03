const express = require("express");

const cors = require('cors')
const helmet = require("helmet");
const path = require('path');
const app = express();


//définition des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(cors());



app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')))

//utilisation des routes
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;