const jwt = require('jsonwebtoken')
const db = require('../database/DB')
const dotenv = require('dotenv')
dotenv.config()

exports.refreshedToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res.status(401).json({ error: 'aucun refreshToken' })
	}
	//vérification de l'existance du refreshToken dans la DB
	db.query(
		'SELECT Id FROM user WHERE RefreshToken =? ',
		[refreshToken],
		function (err, result) {
			if (err || !result.length) {
				return res
					.status(404)
					.json({ error: 'aucun refreshToken valide trouvé' })
			}

			//Vérification du token
			jwt.verify(
				refreshToken,
				process.env.REFRESH_SECRET_TOKEN,
				(err, user) => {
					if (err) {
						return res.status(401).json({ error: 'refreshToken invalide' })
					}
					delete user.iat
					delete user.exp

					const accessToken = jwt.sign(
						{ userId: user.userId, isAdmin: user.isAdmin },
						process.env.SECRET_TOKEN,
						{ expiresIn: '1800s' }
					)
					//renvois d'un accessToken valid
					return res.status(200).json({
						userId: user.userId,
						isAdmin: user.isAdmin,
						token: accessToken,
					})
				}
			)
		}
	)
}
