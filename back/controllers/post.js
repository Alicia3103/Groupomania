const db = require("../database/DB")

//fonction création du post
exports.createPost=(req,res,next)=>{
const userId=2
const title= "titre"//JSON.parse(req.body.title)
const content="bla" //JSON.parse(req.body.content)
const imageUrl= "ici" //req.protocol+"://"+req.headers.host +"/images/"+req.file.filename if req.file exist

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
  const id = 2
  
  db.query('SELECT * FROM post WHERE Id=',[id],function(err,result){
    if(err || !result.length) {
      return res.status(404).json({ message: 'Post non trouvé'});
      }
  if(req.auth.userId ===result[0].UserId){
      const imageUrl = result[0].ImageUrl
      if (imageUrl) {
        const filename = imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${filename}`)
      }
      db.query('DELETE * FROM post WHERE Id=',[id],function(err,result){
        if(err || !result.length) {
          return res.status(404).json({ message: 'Post non supprimé'});
        }
        return res.status(200).json({ message: 'Post supprimé'})
      })
   } 
  })
}
// -------------------------------------------------------
//terminer la gestion du formData et de l'image
// -------------------------------------------------------

//fonction modification de post
exports.modifyPost=(req,res,next)=>{
  const id = 2
  
  db.query('SELECT * FROM post WHERE Id=',[id],function(err,result){
    if(err || !result.length) {
      return res.status(404).json({ message: 'Post non trouvé'});
      }
  if(req.auth.userId ===result[0].UserId){
      const newImageUrl = result[0].ImageUrl//req.protocol+"://"+req.headers.host +"/images/"+req.file.filename if req.file exist
      const newTitle= "new title"//JSON.parse(req.body.title)
      const newContent = result[0].Content//JSON.parse(req.body.content)
      const newImage= req.file
      console.log(imageUrl)


      if (imageUrl!=="" && newImage) {
        const filename = imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${filename}`)

      }

      db.query('UPDATE post SET Title=?, Content=?, ImageUrl=? WHERE Id =?', [newTitle,newContent,newImageUrl,id],function(err,result){
        if(err || !result.length) {
          return res.status(404).json({ message: 'Post non supprimé'});
        }
        return res.status(200).json({ message: 'Post supprimé'})
      })
   } 
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