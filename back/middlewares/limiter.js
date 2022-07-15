const rateLimit = require('express-rate-limit')

// rate limiter
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 3, // Limite a 3 requetes sur 5min
	message: 'Too many login attempts, retry in 5 min',
})

module.exports = { limiter }
