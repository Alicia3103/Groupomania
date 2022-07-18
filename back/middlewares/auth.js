const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		//Récupération du tokken contenu dans le header (split et récupération de la 2e valeur)
		const headerToken = req.headers.authorization.split(' ')[1]

		//Vérification du token
		const decodedToken = jwt.verify(headerToken, process.env.SECRET_TOKEN)

		const userId = decodedToken.userId
		const isAdmin = decodedToken.isAdmin

		//ajout de l'userId lors d'une requete delete (pour comparaison plus tard)
		req.auth = { userId, isAdmin }
		// s'il y a un userId et que ce dernier n'est pas le même que celui du header de la requete
		if (req.body.userId && req.body.userId !== userId) {
			throw res.status(401).json({
				error: 'userId Invalide',
			})
		} else {
			next()
		}
	} catch {
		res.status(400).json({
			error: 'Requête invalide!',
		})
	}
}
