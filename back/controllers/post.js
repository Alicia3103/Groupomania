const db = require("../database/DB")

//fonction création du post
exports.createPost=(req,res,next)=>{
const userId=2
const content="bla"
const imageUrl= "ici"

db.query('INSERT INTO post SET UserId=?, Content =?, ImageUrl =?',[userId,content,imageUrl] ,function(err,result){
    if(err){
        console.log(err)
        return res.status(400).json({ error:"Post non enregistré"})
      }
    
      return res.status(200).json({ message: "Publication ajoutée"})  
})

}

// fonction affichage de tous les posts
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