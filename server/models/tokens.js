const jwt = require('jsonwebtoken')
const config = require('../config/authentication')

function getAccessToken(request, response) {
    const cookie = request.cookies
    if (!cookie.accessToken) {
        response.status(401).send("No token provided")
    }
    try {
        const decodedAccessToken = jwt.verify(cookie.accessToken, config.secret)
        return decodedAccessToken
    }
    catch (error) {
        return response.status(400).send("Invalid token")
    }
}

module.exports = {
    getAccessToken,
}