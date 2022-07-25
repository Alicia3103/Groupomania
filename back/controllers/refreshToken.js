const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



exports.refreshedToken = (req, res) => {
  console.log('refreshedToken ')

  console.log('authHeaderRefresh',req.headers['authorization'])
      const authHeader=req.headers['authorization']
      //Récupération du tokken contenu dans le header (split et récupération de la 2e valeur)
      const headerToken = authHeader && authHeader.split(' ')[1]
      console.log('headerRefreshToken',headerToken)
      if(!headerToken){
        return res.status(401).json({error:'aucun token'})
      }
	//Vérification du token
  jwt.verify(headerToken, process.env.REFRESH_SECRET_TOKEN,(err,user)=>{
		if(err){
			return res.status(401).json({error:'mauvais refreshToken'})
		}
		delete user.iat
		delete user.exp
		console.log('user')
		console.log(user)
    const accessToken=jwt.sign(
      { userId: user.userId, isAdmin: user.IsAdmin },
      process.env.SECRET_TOKEN,
      { expiresIn: '10s' }
    )
		
    return res.status(200).json({
			userId: user.userId,
			isAdmin: user.IsAdmin,
			//encodage avec la fonction 'sign'
			token: accessToken
		})
	
	
	})

}