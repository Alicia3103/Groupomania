//appels des différents packages node
const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

//appel de la Base de Données Mysql
const db = require('./database/DB')

//appel de la variable d'environnement correspondant au port
const MY_PORT = process.env.PORT

//Normalize du port

const normalizePort = (val) => {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}
const port = normalizePort(MY_PORT || '3080')

app.set('port', port)

const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error
	}
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.')
			process.exit(1)
			break
		default:
			throw error
	}
}

// création du server
const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
	console.log('Listening on ' + bind)
})

server.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`))
