const jwt = require('jsonwebtoken')
const db = require('../database/DB')
const dotenv = require('dotenv')
dotenv.config()

exports.refreshedToken = (req, res) => {
	console.log('refreshcookies', req.cookies.refreshToken)

	const refreshToken = req.cookies.refreshToken
	console.log('RefreshToken', refreshToken)
	if (!refreshToken) {
		return res.status(401).json({ error: 'aucun refreshToken' })
	}

	db.query(
		'SELECT Actif FROM user WHERE RefreshToken =? ',
		[refreshToken],
		function (err, result) {
			if (err || !result.length) {
				return res
					.status(404)
					.json({ error: 'aucun refreshToken valide trouvé' })
			} else if (result[0].Actif === 0) {
				return res.status(403).json({ error: 'Compte désactivé' })
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
					console.log('user')
					console.log(user)

					const accessToken = jwt.sign(
						{ userId: user.userId, isAdmin: user.isAdmin },
						process.env.SECRET_TOKEN,
						{ expiresIn: '1800s' }
					)

					return res.status(200).json({
						userId: user.userId,
						isAdmin: user.isAdmin,
						//encodage avec la fonction 'sign'
						token: accessToken,
					})
				}
			)
		}
	)
}
