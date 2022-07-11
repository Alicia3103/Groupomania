const db = require("../database/DB")

//variable d'environnement
const secretToken = process.env.SECRET_TOKEN
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

    .then(hash => {         //ajouter les autres données de user (date is admin etc)
        db.query('INSERT INTO user SET  Nom =?, Prenom =?, Email =?, Password= ?',[nom,prenom,email,hash],function (err, result){
            if (err) {
                console.log(err)
                return res.status (400).json ({error:'creation de compte impossible'})
                }
                res.status(201).json({ message: "Utilisateur créé"})    
        })
    
    })
    .catch(error =>{
        console.log(error)
        return res.status(500).json ({error:'problème hash'})
    })
})
};

//fonction login
exports.login = (req, res, next) => {
    
    const email = req.body.email
    const password=req.body.password
    //méthode 'select * from user where email=?' pour trouver l'utilisateur dont l'email correspond
    db.query('SELECT * FROM user WHERE Email =?', [email], 
    function(err, result) {

        if(err || !result.length) {
            return res.status(404).json({ message: 'Utilisateur non trouvé'});
        }
        const user = result[0];
        if (user.Actif ===0 ){
            return res.status(401).json({message: 'Compte désactivé'});
        }    
            bcrypt.compare(password, user.Password) 
            .then(valid => {
                if (!valid) {
                    return res.status(409).json({message: 'Mot de passe incorrect !'});
                  }
                 return res.status(200).json({
                    userId: user.Id,
                    //encodage avec la fonction 'sign'
                    token: jwt.sign({userId: user.Id}, secretToken,{expiresIn: '24H'})
                })
          })
          .catch(error => res.status(500).json({error}));
         })
      
  };
  exports.getUser = (req, res, next) => {
    const userId=req.auth.userId
      db.query('SELECT Nom,Prenom,Email FROM user WHERE Id =? ',[userId], function(err,result){
          if(err){
            console.log(err)
            return res.status(404).json({ error:"aucun utilisateur trouvé"})
          }
          
          return res.status(200).json({ result})
        })
      };

  exports.unactiveAccount = (req, res) => { //désactive son propre compte
    
    const id = req.auth.userId; // arriver a recuperer le userId
    
    db.query('UPDATE user SET Actif=0 WHERE Id =?', [id],
    function(err, result) {
        if(err || result.affectedRows===0) {
            return res.status(404).json({ err : "Utilisateur non trouvé" });
        } 
        res.status(200).json({ message: "Compte désactivé !"})
    });
};
