const rateLimit = require('express-rate-limit')

// rate limiter
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 10, // Limite a 3 requetes sur 5min
	error: 'Trop de tentatives, éssayez à nouveau dans 5 min',
})

module.exports = { limiter }
