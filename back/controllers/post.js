const db = require('../database/DB')
const fs = require('fs')

//fonction création du post
exports.createPost = (req, res, next) => {
	const body = JSON.parse(req.body.post)

	const userId = req.auth.userId
	const title = body.title
	const content = body.content
	let imageUrl = ''

	//si le formData contient une image on récupère son nom pour créer son url
	if (req.file)
		imageUrl =
			req.protocol + '://' + req.headers.host + '/images/' + req.file.filename

	//création de la ligne dans la DB avec toutes les infos
	db.query(
		'INSERT INTO post SET UserId=?, Title=?,Content =?, ImageUrl =?',
		[userId, title, content, imageUrl],
		function (err, result) {
			if (err) {
				return res.status(400).json({ error: 'Post non enregistré' })
			}

			return res.status(201).json({ message: 'Publication ajoutée' })
		}
	)
}

//fonction supression du post
exports.deletePost = (req, res, next) => {
	const id = req.params.id
	//slélection du post dans la DB
	db.query('SELECT * FROM post WHERE Id=?', [id], function (err, result) {
		if (err || !result.length) {
			return res.status(404).json({ error: 'Post non trouvé' })
			//vérification de l'identité de l'auteur de la requete
		} else if (req.auth.userId === result[0].UserId || req.auth.isAdmin === 1) {
			const imageUrl = result[0].ImageUrl
			//s'il y a une image on la supprime dans le dossier
			if (imageUrl) {
				const filename = imageUrl.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}
			//suppression du post dans la DB
			db.query('DELETE FROM post WHERE Id=?', [id], function (err, result) {
				if (err) {
					return res
						.status(400)
						.json({ error: 'impossible de récupérer les données' })
				}
				return res.status(200).json({ message: 'Post supprimé' })
			})
		} else {
			return res
				.status(403)
				.json({ error: 'Vous ne pouvez pas supprimer ce post' })
		}
	})
}

//fonction modification de post
exports.modifyPost = (req, res, next) => {
	const body = JSON.parse(req.body.post)

	const id = body.id

	//sélection du post dans la DB
	db.query('SELECT * FROM post WHERE Id=?', [id], function (err, result) {
		if (err || !result.length) {
			return res.status(404).json({ error: 'Post non trouvé' })
		}
		//vérification de l'identité de l'auteur de la requete ou du statut d'admin
		if (req.auth.userId === result[0].UserId || req.auth.isAdmin === 1) {
			const oldImage = result[0].ImageUrl
			let newImageUrl = oldImage
			//si l'utilisateur ne veut plus d'image sur son post on vide l'entrée de l'image url
			if (body.deleteImage === true) {
				newImageUrl = ''
				//s'il y avait une ancienne image on la supprime dans le dossier
				if (oldImage) {
					const filename = oldImage.split('/images/')[1]
					fs.unlinkSync(`images/${filename}`)
				}
			}
			//s'il y a une image dans le formdata on récupère son nom et on créé son url
			if (req.file) {
				newImageUrl =
					req.protocol +
					'://' +
					req.headers.host +
					'/images/' +
					req.file.filename
				//s'il y avait une ancienne image on la supprime dans le dossier
				if (oldImage) {
					const filename = oldImage.split('/images/')[1]
					fs.unlinkSync(`images/${filename}`)
				}
			}
			const newTitle = body.title
			const newContent = body.content
			// on met à jour les nouveau contenus dans la DB
			db.query(
				'UPDATE post SET Title=?, Content=?, ImageUrl =? WHERE Id=?',
				[newTitle, newContent, newImageUrl, id],
				function (err, result) {
					if (err) {
						return res.status(404).json({ error: 'Post non modifié' })
					}

					return res
						.status(200)
						.json({ imageUrl: newImageUrl, message: 'Post modifié' })
				}
			)
		} else {
			return res
				.status(403)
				.json({ error: 'Vous ne pouvez pas modifier ce post' })
		}
	})
}

// fonction affichage de tous les posts
exports.getAllPost = (req, res, next) => {
	//récupération des informations de la table post ainsi que le nom de l'auteur et le nomre de like de chque post
	db.query(
		'SELECT post.Id,Title,Content,ImageUrl,CreateTime,UserId,(SELECT count(*) FROM userliked WHERE post.Id=userliked.PostId) AS Likes,user.Nom,user.Prenom FROM post LEFT JOIN user On post.UserId=user.Id ORDER BY CreateTime DESC',
		function (err, result) {
			if (err) {
				return res
					.status(404)
					.json({ error: 'impossible de récupérer les données' })
			}

			return res.status(200).json({ result })
		}
	)
}

//récupération des likes de l'utilisateur

exports.getLikedPost = (req, res, next) => {
	const userId = req.auth.userId

	//selection de tous les Id des post dans la table urseliked correspondant à l'utilisateur
	db.query(
		'SELECT PostId FROM userLiked WHERE UserId=? ',
		[userId],
		function (err, result) {
			if (err) {
				return res
					.status(400)
					.json({ error: 'impossible de récupérer les données' })
			}

			let arrayPostId = []
			result.forEach((Like) => {
				arrayPostId.push(Like.PostId)
			})

			return res.status(200).json({ arrayPostId })
		}
	)
}

//like d'un post

exports.likePost = (req, res, next) => {
	const postId = req.params.id
	const userId = req.auth.userId
	//vérification si l'utilistauer a déjà liké ce post
	db.query(
		'SELECT * FROM userLiked WHERE UserId=? AND PostId=?',
		[userId, postId],
		function (err, result) {
			if (err) {
				return res
					.status(400)
					.json({ error: 'impossible de récupérer les données' })
			}
			//s'il a déjà liké on retire son like
			if (result.length) {
				db.query(
					'DELETE FROM userLiked WHERE UserId=? AND PostId=?',
					[userId, postId],
					function (err, result) {
						if (err) {
							return res.status(400).json({ error: 'Like non supprimé' })
						}
						//renvois du nouveau nombre de likes du post
						db.query(
							'SELECT (SELECT count(*) FROM userliked WHERE post.Id=userliked.PostId) AS Likes FROM post WHERE post.Id=?',
							[postId],
							function (err, result) {
								if (err) {
									console.log(err)
									return res
										.status(400)
										.json({ error: 'impossible de recupérer les likes' })
								}
								const nbLike = result[0].Likes

								return res.status(200).json({ nbLike, message: 'Like enlevé' })
							}
						)
					}
				)
				//s'il n'a pas déjà liké le post on ajoute son like à la table userLiked
			} else {
				db.query(
					'INSERT INTO userLiked SET PostId=?, UserId=?',
					[postId, userId],
					function (err, result) {
						if (err) {
							console.log(err)
							return res
								.status(400)
								.json({ error: 'impossible de liker le post' })
						}
						//renvois du nouveau nombre de likes du post
						db.query(
							'SELECT (SELECT count(*) FROM userliked WHERE post.Id=userliked.PostId) AS Likes FROM post WHERE post.Id=?',
							[postId],
							function (err, result) {
								if (err) {
									console.log(err)
									return res
										.status(400)
										.json({ error: 'impossible de recupérer les likes' })
								}
								const nbLike = result[0].Likes

								return res.status(200).json({ nbLike, message: 'Like ajouté' })
							}
						)
					}
				)
			}
		}
	)
}
// fonction affichage de tous les posts du user
exports.getAllUserPost = (req, res, next) => {
	const userId = req.auth.userId
	//sélection de tous les post de l'utilisateur ainsi que le nb de like de chaque post
	db.query(
		'SELECT post.Id,Title,Content,ImageUrl,CreateTime,UserId,(SELECT count(*) FROM userliked WHERE post.Id=userliked.PostId) AS Likes,user.Nom,user.Prenom FROM post LEFT JOIN user On post.UserId=user.Id WHERE UserId=? ORDER BY CreateTime DESC',
		[userId],
		function (err, result) {
			if (err) {
				return res
					.status(404)
					.json({ error: 'impossible de récupérer les données' })
			}

			return res.status(200).json({ result })
		}
	)
}
