const jwt = require('jsonwebtoken')
const config = require('../config/authentication')

function verifyAccessToken(request, response, next) {
    const cookie = request.cookies
    if (!cookie.accessToken) {
        response.status(401).send("No token provided")
    }
    try {
        jwt.verify(cookie.accessToken, config.secret)
        next()
    }
    catch (error) {
        return response.status(400).send("Invalid token")
    }
}

module.exports = {
    verifyAccessToken,
}