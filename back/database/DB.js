const mysql = require('mysql') 
const dotenv = require("dotenv");
dotenv.config();



const db = mysql.createConnection({

  host     : "localhost",
  user     : "root",
  port: 3306,
  password : "root",
  database : "groupomania"
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  })

  module.exports = db