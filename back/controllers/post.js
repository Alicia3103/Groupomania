const db = require("../database/DB")
const fs = require('fs')
//fonction création du post
exports.createPost=(req,res,next)=>{
 
const body=JSON.parse(req.body.post)

const userId=req.auth.userId
const title= body.title
const content=body.content
let imageUrl= ''
if(req.file) imageUrl= req.protocol+"://"+req.headers.host +"/images/"+req.file.filename 


db.query('INSERT INTO post SET UserId=?, Title=?,Content =?, ImageUrl =?',[userId,title,content,imageUrl] ,function(err,result){
    if(err){
        console.log(err)
        return res.status(400).json({ error:"Post non enregistré"})
      }
      
      return res.status(200).json({ message: "Publication ajoutée"})  
})

}

//fonction supression du post
exports.deletePost=(req,res,next)=>{
  const id = req.body.id


  db.query('SELECT * FROM post WHERE Id=?',[id],function(err,result){
    
    if(err || !result.length) {
      return res.status(404).json({ message: 'Post non trouvé'});
      }
  
    if(req.auth.userId ===result[0].UserId || req.auth.isAdmin===1){
        const imageUrl = result[0].ImageUrl
        if (imageUrl) {
          const filename = imageUrl.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`)
        }
        db.query('DELETE * FROM post WHERE Id=?',[id],function(err,result){
          if(err || !result.length) {
            return res.status(404).json({ message: 'Post non supprimé'});
          }
          return res.status(200).json({ message: 'Post supprimé'})
        })
    } 
    return res.status(401).json({ message: 'Vous ne pouvez pas supprimer ce post'});
  })
}
// -------------------------------------------------------
//terminer la gestion du formData et de l'image
// -------------------------------------------------------

//fonction modification de post
exports.modifyPost=(req,res,next)=>{
  const body=JSON.parse(req.body.post)
  
  const id=body.id
  


  db.query('SELECT * FROM post WHERE Id=?', [id], 
    function(err, result) {
    if(err || !result.length) {
      return res.status(404).json({ message: 'Post non trouvé'});
      }
    if(req.auth.userId ===result[0].UserId){
      let newImageUrl= ''
      const oldImage= result[0].ImageUrl
     
      if(req.file) newImageUrl= req.protocol+"://"+req.headers.host +"/images/"+req.file.filename 
      const newTitle= body.title
      const newContent = body.content
   
        db.query('UPDATE post SET Title=?, Content=?, ImageUrl =? WHERE Id=?', [newTitle,newContent,newImageUrl,id],function(err,result){
          if(err ) {
            return res.status(404).json({ message: 'Post non modifié'});
          }
          return res.status(200).json({ message: 'Post modifié'})
        })

        if (newImageUrl!=="" && oldImage) {
          console.log("remplacer l'image")
          const filename = oldImage.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`)

        }
    } 
  })
}


// fonction affichage de tous les posts
exports.getAllPost = (req, res, next) => {
    db.query('SELECT * FROM post ORDER BY CreateTime DESC', function(err,result){
        if(err){
          console.log(err)
          return res.status(404).json({ error:"aucun posts trouvés"})
        }
        
        return res.status(200).json({ result})
      })
    };

    //fonction like

    exports.likePost=(req,res,next)=>{
      const postId= 2
      const userId = 1
      db.query('SELECT * FROM post WHERE Id=?',[postId],function(err,result){
        if(err || !result.length) {
          return res.status(404).json({ message: 'Post non trouvé'});
          }
          const recupUserLike = JSON.parse(result[0].LikeUser)
          let userLike = []
          if (recupUserLike.length) {
            userLike=recupUserLike
          }
          if ( recupUserLike.includes(userId)){
            return res.status(400).json({ error:"vous avez deja liké ce post"})
          }
          const newLike=result[0].Likes++
          userLike.push(userId)
          const newUserLike=JSON.stringify(userLike)

          db.query('UPDATE post SET Likes=?, LikeUser=?   where Id=?', [ newLike, newUserLike, postId ],function(err,result){
            if(err){
              console.log(err)
              return res.status(400).json({ error:"impossible de liker le post"})
            }
            return res.status(200).json({message: "Post liké"}) 
           
          })
      })
    }
    // fonction affichage de tous les posts
exports.getAllUserPost = (req, res, next) => {
const userId=req.auth.userId
  db.query('SELECT * FROM post WHERE UserId =? ORDER BY CreateTime DESC',[userId], function(err,result){
      if(err){
        console.log(err)
        return res.status(404).json({ error:"aucun posts trouvés"})
      }
      
      return res.status(200).json({ result})
    })
  };