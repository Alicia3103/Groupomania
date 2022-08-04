const db = require('../database/DB')

//variable d'environnement
const secretToken = process.env.SECRET_TOKEN
//import des modules de node
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//enregistrer un utilisateur
exports.signup = (req, res, next) => {
	const email = req.body.email
	const nom = req.body.nom
	const prenom = req.body.prenom

	console.log('signup')
	//hash et sallage du MDP grace a Bcrypt
	bcrypt.genSalt(parseInt(process.env.SALT)).then((salt) => {
		bcrypt
			.hash(req.body.password, salt)

			.then((hash) => {
				db.query(
					'INSERT INTO user SET  Nom =?, Prenom =?, Email =?, Password= ?',
					[nom, prenom, email, hash],
					function (err, result) {
						if (err) {
							if (err.errno === 1062) {
								return res.status(409).json({ error: 'email déjà utilisé' })
							}
							return res
								.status(400)
								.json({ error: 'creation de compte impossible' })
						}
						res.status(201).json({ message: 'Utilisateur créé' })
					}
				)
			})
			.catch((error) => {
				return res.status(400).json({ error: 'problème hash' })
			})
	})
}

//fonction login
exports.login = (req, res, next) => {
	const email = req.body.email
	const password = req.body.password
	console.log(req.body.email, req.body.password)
	db.query(
		'SELECT Id,Actif,IsAdmin,Password FROM user WHERE Email =?',
		[email],
		function (err, result) {
			if (err || !result.length) {
				return res.status(404).json({ error: 'Utilisateur non trouvé' })
			}
			const user = result[0]
			if (user.Actif === 0) {
				return res.status(401).json({ error: 'Compte désactivé' })
			}
			bcrypt
				.compare(password, user.Password)
				.then((valid) => {
					if (!valid) {
						return res.status(409).json({ message: 'Mot de passe incorrect !' })
					}
					const refreshToken = jwt.sign(
						{ userId: user.Id, isAdmin: user.IsAdmin },
						process.env.REFRESH_SECRET_TOKEN,
						{ expiresIn: '24h' }
					)
					db.query(
						'UPDATE user SET RefreshToken=? WHERE Email=?',
						[refreshToken, email],
						function (err, result) {
							if (err) {
								console.log(err)
								return res.status(404).json({ error: 'Post non modifié' })
							}
							res.cookie('refreshToken', refreshToken, {
								httpOnly: true,
								samesite: 'None',
								secure: true,
								maxAge: 24 * 60 * 60 * 1000,
							})

							return res.status(200).json({
								userId: user.Id,
								isAdmin: user.IsAdmin,
								//encodage avec la fonction 'sign'
								token: jwt.sign(
									{ userId: user.Id, isAdmin: user.IsAdmin },
									secretToken,
									{ expiresIn: '1800s' }
								),
							})
						}
					)
				})
				.catch((error) => res.status(500).json({ error }))
		}
	)
}

//fonction logout
exports.logout = (req, res, next) => {
	const cookies = req.cookies
	if (!cookies?.refreshToken)
		return res.status(204).json({ message: 'Pas de cookies' })
	db.query(
		'UPDATE user SET RefreshToken=? WHERE RefreshToken=?',
		[null, cookies.refreshToken],
		function (err, result) {
			if (err) {
				return res.status(404).json({ error: 'Post non modifié' })
			}

			res.clearCookie('refreshToken', {
				httpOnly: true,
				samesite: 'None',
				secure: true,
			})
			return res.status(204).json({ message: 'cookies supprimés' })
		}
	)
}

exports.getUser = (req, res, next) => {
	const userId = req.auth.userId
	db.query(
		'SELECT Nom,Prenom,Email, Actif FROM user WHERE Id =? ',
		[userId],
		function (err, result) {
			if (err) {
				return res.status(404).json({ error: 'aucun utilisateur trouvé' })
			} else if (result[0].Actif === 0) {
				return res.status(403).json({ error: 'Compte désactivé' })
			}
			const user = {
				Nom: result[0].Nom,
				Prenom: result[0].Prenom,
				Email: result[0].Email,
			}
			console.log(user)
			return res.status(200).json({ user })
		}
	)
}

//désactive son propre compte
exports.unactiveAccount = (req, res) => {
	const id = req.auth.userId

	db.query(
		'UPDATE user SET Actif=0 , UnactiveTime = CURRENT_TIMESTAMP WHERE Id =?',
		[id],
		function (err, result) {
			if (err || result.affectedRows === 0) {
				return res
					.status(404)
					.json({ error: 'Impossible de désactiver le compte' })
			}
			res.status(200).json({ message: 'Compte désactivé !' })
		}
	)
}
