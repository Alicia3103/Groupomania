const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
console.log('auth')

console.log('authHeader',req.headers)
		const authHeader=req.headers['authorization']
		//Récupération du tokken contenu dans le header (split et récupération de la 2e valeur)
		const headerToken = authHeader && authHeader.split(' ')[1]
		console.log('headreToken',headerToken)
		if(!headerToken){
			return res.status(401).json({error:'aucun token'})
		}
		//Vérification du token
		jwt.verify(headerToken, process.env.SECRET_TOKEN,(err,user)=>{
			console.log('here')
			if(err){
				console.log('erreur')
				return res.sendStatus(401)
			}
		console.log('pas derreur')
		const userId = user.userId
		const isAdmin = user.isAdmin
		//ajout de l'userId lors d'une requete delete (pour comparaison plus tard)
		req.auth = { userId, isAdmin }
		next()
		})

}
