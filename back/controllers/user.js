const db = require("../database/DB")

//import des modules de node
const bcrypt= require("bcrypt")
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken')

//enregistrer un utilisateur 
exports.signup = (req, res, next) => {
    const email = req.body.email
    const nom = req.body.nom
    const prenom = req.body.prenom 
    //hash et sallage du MDP grace a Bcrypt
bcrypt.genSalt(parseInt(process.env.SALT))
.then(salt=>{
  bcrypt.hash(req.body.password,salt)

    .then(hash => { 
        //ajouter les autres données de user (date is admin etc)
        db.query("insert into user set  Nom =?, Prenom =?, Email =?, Password= ?",[nom,prenom,email,hash],function (err, result){
            if (err) {
                console.log(err)
                return res.status (400).json ({error:'creation de compte impossible'})
                }
               return res.status(201).json( { message: 'utilisateur crée'})

        })
    })
    .catch(error =>{
        console.log(error)
        return res.status(500).json ({error:'problème hash'})
    })
})
};
