const mysql = require('mysql') 
const dotenv = require("dotenv");
dotenv.config();



const db = mysql.createConnection({

  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  port: 3306,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  })

  module.exports = db