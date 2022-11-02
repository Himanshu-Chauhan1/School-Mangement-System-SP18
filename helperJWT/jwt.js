const JWT = require("jsonwebtoken")
const db = require("../models")
const { User } = db

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.SECRET_KEY
        const option = {
            expiresIn: "4h",
            issuer: "sparkeighteen.com",
            audience: userId,

        };

        JWT.sign(payload, secret, option, (err, token) => {
            if (err) return reject(err);
            resolve(token)
        })
    })
}

module.exports = signAccessToken