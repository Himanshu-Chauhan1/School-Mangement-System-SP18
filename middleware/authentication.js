const jwt = require("jsonwebtoken")



//----------------------------------------authentication----------------------------------------------------*/

const authentication = async function (req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(422).send({ 1002: false, message: "Token is Required" })

        let splitToken = token.split(" ")
        let decodedToken = jwt.verify(splitToken[1], process.env.SECRET_KEY)

        if (!decodedToken) {
            return res.status(400).send({ status: false, massage: "token is invalid" })
        }

        let exp = decodedToken.expiresIn
        let iatNow = Math.floor(Date.now() / 1000)
        if (exp < iatNow) {
            return res.status(401).send({ status: false, massage: 'Session expired, Please login again' })
        }

    } catch (error) {
        res.status(401).send({ status: false, message: "Sorry, you must provide a valid token" });
    }
};

module.exports = { authentication }




