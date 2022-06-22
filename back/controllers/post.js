const db = require("../database/DB")


// fonction affichage de toutes les sauces
exports.getAllPost = (req, res, next) => {
    db.query('SELECT * FROM post ORDER BY Create_time DESC', function(err,result){
        if(err){
          console.log(err)
          return res.status(404).json({ error:"aucun posts trouvés"})
        }
        console.log(result)
        return res.status(200).json({ result})
      })
    };