const jwt = require("jsonwebtoken")

//----------------------------------------authentication----------------------------------------------------*/

const authentication = async function (req, res, next) {
    try {

        let token = req.header('Authorization', 'Bearer Token');
        if (!token) return res.status(400).send({ status: 1002, message: "login is required" })

        let splitToken = token.split(" ")

        let verifiedtoken = jwt.verify(splitToken[1], process.env.SECRET_KEY)
        if (!verifiedtoken) return res.status(400).send({ status: 1003, message: "token is invalid" })

        let exp = verifiedtoken.option.expiresIn
        let iatNow = Math.floor(Date.now() / 1000)
        if (exp < iatNow) {
            return res.status(401).send({ status: false, message: 'session expired, please login again' })
        }

        req.verifiedtoken=verifiedtoken

        next();

    } catch (error) {
        res.status(401).send({ status: 1010, message: "Sorry, you must provide a valid token" });
    }
};


module.exports = { authentication}




