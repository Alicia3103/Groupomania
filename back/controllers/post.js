const db = require('../database/DB')
const fs = require('fs')
//fonction création du post
exports.createPost = (req, res, next) => {
	const body = JSON.parse(req.body.post)

	const userId = req.auth.userId
	const title = body.title
	const content = body.content
	let imageUrl = ''
	if (req.file)
		imageUrl =
			req.protocol + '://' + req.headers.host + '/images/' + req.file.filename

	db.query(
		'INSERT INTO post SET UserId=?, Title=?,Content =?, ImageUrl =?',
		[userId, title, content, imageUrl],
		function (err, result) {
			if (err) {
				console.log(err)
				return res.status(400).json({ error: 'Post non enregistré' })
			}

			return res.status(200).json({ message: 'Publication ajoutée' })
		}
	)
}

//fonction supression du post
exports.deletePost = (req, res, next) => {
	const id = req.params.id

	db.query('SELECT * FROM post WHERE Id=?', [id], function (err, result) {
		if (err || !result.length) {
			return res.status(404).json({ message: 'Post non trouvé' })
		} else if (req.auth.userId === result[0].UserId) {
			const imageUrl = result[0].ImageUrl
			if (imageUrl) {
				const filename = imageUrl.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}
			db.query('DELETE FROM post WHERE Id=?', [id], function (err, result) {
				if (err) {
					return res.status(404).json({ error: 'Post non supprimé' })
				}
				return res.status(200).json({ message: 'Post supprimé' })
			})
		} else {
			return res
				.status(401)
				.json({ message: 'Vous ne pouvez pas supprimer ce post' })
		}
	})
}
// -------------------------------------------------------
//terminer la gestion du formData et de l'image
// -------------------------------------------------------

//fonction modification de post
exports.modifyPost = (req, res, next) => {
	const body = JSON.parse(req.body.post)

	const id = body.id

	db.query('SELECT * FROM post WHERE Id=?', [id], function (err, result) {
		if (err || !result.length) {
			return res.status(404).json({ error: 'Post non trouvé' })
		}
		if (req.auth.userId === result[0].UserId) {
			let newImageUrl = ''
			const oldImage = result[0].ImageUrl

			if (req.file)
				newImageUrl =
					req.protocol +
					'://' +
					req.headers.host +
					'/images/' +
					req.file.filename
			const newTitle = body.title
			const newContent = body.content

			db.query(
				'UPDATE post SET Title=?, Content=?, ImageUrl =? WHERE Id=?',
				[newTitle, newContent, newImageUrl, id],
				function (err, result) {
					if (err) {
						return res.status(404).json({ error: 'Post non modifié' })
					}
					return res.status(200).json({ message: 'Post modifié' })
				}
			)

			if (newImageUrl !== '' && oldImage) {
				const filename = oldImage.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}
		}
	})
}

// fonction affichage de tous les posts
exports.getAllPost = (req, res, next) => {
	db.query(
		'SELECT * FROM post ORDER BY CreateTime DESC',
		function (err, result) {
			if (err) {
				console.log(err)
				return res.status(404).json({ error: 'aucun posts trouvés' })
			}

			return res.status(200).json({ result })
		}
	)
}

//fonction get like

exports.getLikedPost = (req, res, next) => {
	const userId = req.auth.userId
	db.query(
		'SELECT PostId FROM userLiked WHERE UserId=?',
		[userId],
		function (err, result) {
			if (err) {
				return res.status(404).json({ error: 'err' })
			}
			let likedPost = []
			if (result.length) {
				for (let i = 0; i < result.length; i++) {
					likedPost.push(result[i].PostId)
				}

				return res.status(200).json({ likedPost })
			}
		}
	)
}
//fonction like

exports.likePost = (req, res, next) => {
	const postId = req.params.id
	const userId = req.auth.userId

	db.query(
		'SELECT * FROM userLiked WHERE UserId=? AND PostId=?',
		[userId, postId],
		function (err, result) {
			if (err) {
				return res.status(400).json({ error: 'err' })
			}
			if (result.length) {
				db.query(
					'DELETE FROM userLiked WHERE UserId=? AND PostId=?',
					[userId, postId],
					function (err, result) {
						if (err) {
							return res.status(404).json({ error: 'Like non supprimé' })
						}
						return res.status(200).json({ message: 'Like supprimé' })
					}
				)
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
						return res.status(200).json({ message: 'Post liké' })
					}
				)
			}
		}
	)
}
// fonction affichage de tous les posts
exports.getAllUserPost = (req, res, next) => {
	const userId = req.auth.userId
	db.query(
		'SELECT * FROM post WHERE UserId =? ORDER BY CreateTime DESC',
		[userId],
		function (err, result) {
			if (err) {
				console.log(err)
				return res.status(404).json({ error: 'aucun posts trouvés' })
			}

			return res.status(200).json({ result })
		}
	)
}
