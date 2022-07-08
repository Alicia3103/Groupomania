const mysql = require('mysql2') 
const dotenv = require("dotenv");
dotenv.config();



const db = mysql.createConnection({

  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,

  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  })
  db.query("CREATE DATABASE IF NOT EXISTS "+ process.env.DB_DATABASE, function (err, result) {
    if (err) throw err;
    console.log("Base de données crée !");
  });
  db.query("USE "+ process.env.DB_DATABASE, function (err, result) {
    if (err) throw err;
    console.log("Base de données sélectionné !");
  });
  db.query(`CREATE TABLE IF NOT EXISTS user (
    Id INT NOT NULL AUTO_INCREMENT, 
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Nom VARCHAR(255) NOT NULL, 
    Prenom VARCHAR(255) NOT NULL, 
    IsAdmin TINYINT NOT NULL DEFAULT 0,
    Actif TINYINT NOT NULL DEFAULT 1,
    CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UnactiveTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE INDEX Id_UNIQUE (Id ASC) VISIBLE,
    UNIQUE INDEX Email_UNIQUE (Email ASC) VISIBLE)`, 
    function (err, result) {
      if (err) throw err;
      console.log("Table user crée !");
  });
  db.query(`CREATE TABLE IF NOT EXISTS post (
    Id INT NOT NULL AUTO_INCREMENT, 
    Likes INT DEFAULT 0,
    Title VARCHAR(255) , 
    Content TEXT, 
    ImageUrl VARCHAR(255),
    CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UserId INT NOT NULL,
    PRIMARY KEY (Id),
    UNIQUE INDEX Id_UNIQUE (Id ASC) VISIBLE,
    FOREIGN KEY(UserId) REFERENCES user(Id))`, 
    function (err, result) {
      if (err) throw err;
      console.log("Table post crée !");
  });

  module.exports = db