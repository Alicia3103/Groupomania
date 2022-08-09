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

	//hash et sallage du MDP grace a Bcrypt
	bcrypt.genSalt(parseInt(process.env.SALT)).then((salt) => {
		bcrypt
			.hash(req.body.password, salt)
			//stockage des informations utilisateur dont le MDP salté et crypté
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

	//récupération des données utilisateur et vérification de la correspondance du MDP
	db.query(
		'SELECT Id,Actif,IsAdmin,Password FROM user WHERE Email =?',
		[email],
		function (err, result) {
			if (err || !result.length) {
				return res.status(404).json({ error: 'Utilisateur non trouvé' })
			}
			const user = result[0]

			bcrypt
				.compare(password, user.Password)
				.then((valid) => {
					if (!valid) {
						return res.status(409).json({ message: 'Mot de passe incorrect !' })
					}
					//création d'un refreshToken pour le maintient de la connexion jusqu'à 24h
					const refreshToken = jwt.sign(
						{ userId: user.Id, isAdmin: user.IsAdmin },
						process.env.REFRESH_SECRET_TOKEN,
						{ expiresIn: '24h' }
					)
					//stockage du refreshToken dans la DB pour comparaison plus tard
					db.query(
						'UPDATE user SET RefreshToken=? WHERE Email=?',
						[refreshToken, email],
						function (err, result) {
							if (err) {
								console.log(err)
								return res.status(404).json({ error: 'Post non modifié' })
							}
							//stockage du refreshToken dans un cookie sécurisé pour reconnexion jusqu'à 24h
							res.cookie('refreshToken', refreshToken, {
								httpOnly: true,
								samesite: 'None',
								secure: true,
								maxAge: 24 * 60 * 60 * 1000,
							})

							return res.status(200).json({
								userId: user.Id,
								isAdmin: user.IsAdmin,
								//encodage avec la fonction 'sign' du token de connexion
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
	//clear du refreshToken dans la DB
	db.query(
		'UPDATE user SET RefreshToken=? WHERE RefreshToken=?',
		[null, cookies.refreshToken],
		function (err, result) {
			if (err) {
				return res.status(404).json({ error: 'Post non modifié' })
			}
			//nettoyage du cookie pour empecher la reconnexion depuis le terminal
			res.clearCookie('refreshToken', {
				httpOnly: true,
				samesite: 'None',
				secure: true,
			})
			return res.status(204).json({ message: 'cookies supprimés' })
		}
	)
}
//récupération des données utilistaeur
exports.getUser = (req, res, next) => {
	const userId = req.auth.userId
	db.query(
		'SELECT Nom,Prenom,Email, Actif FROM user WHERE Id =? ',
		[userId],
		function (err, result) {
			if (err) {
				return res.status(404).json({ error: 'aucun utilisateur trouvé' })
			}
			const user = {
				Nom: result[0].Nom,
				Prenom: result[0].Prenom,
				Email: result[0].Email,
			}

			return res.status(200).json({ user })
		}
	)
}

//supprimer son propre compte
exports.deleteAccount = (req, res) => {
	const id = req.auth.userId

	db.query('DELETE FROM user  WHERE Id =?', [id], function (err, result) {
		if (err || result.affectedRows === 0) {
			return res
				.status(404)
				.json({ error: 'Impossible de supprimer le compte' })
		}
		res.status(200).json({ message: 'Compte dsupprimé !' })
	})
}
