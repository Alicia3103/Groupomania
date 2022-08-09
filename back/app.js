//appel des modules nécessaires

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

//définition des routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const refreshCtrl = require('./controllers/refreshToken')
// cross origine policies
app.use(
	helmet(
		{ crossOriginResourcePolicy: { policy: 'cross-origin' } },
		{ crossOriginOpenerPolicy: { policy: 'cross-origin' } }
	)
)

//ne pas tout autoriser dans les cors, block avec le withcredential, sécurisation pour le refrteshToken dans le httpOnly cookie

app.use(
	cors({
		credentials: true,
		origin: process.env.FRONT_PORT,
		optionsSuccessStatus: 200,
	})
)

//utilisation du cookie parser pour lire le refreshToken du httpOnlyCookie et express
app.use(cookieParser())

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

//utilisation des routes
app.use('/api/post', postRoutes)
app.use('/api/auth', userRoutes)
app.get('/api/refreshToken', refreshCtrl.refreshedToken)

module.exports = app
