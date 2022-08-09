const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.headers['authorization']
	//Récupération du tokken contenu dans le header (split et récupération de la 2e valeur)
	const headerToken = authHeader && authHeader.split(' ')[1]

	if (!headerToken) {
		return res.status(401).json({ error: 'aucun token' })
	}
	//Vérification du token
	jwt.verify(headerToken, process.env.SECRET_TOKEN, (err, user) => {
		if (err) {
			return res.sendStatus(401)
		}

		const userId = user.userId
		const isAdmin = user.isAdmin
		//ajout de l'userId lors d'une requete delete (pour comparaison plus tard)
		req.auth = { userId, isAdmin }
		next()
	})
}
