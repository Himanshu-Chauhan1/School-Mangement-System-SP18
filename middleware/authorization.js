const jwt = require("jsonwebtoken")
const db = require("../models")
const { User } = db


//----------------------------------------authorization----------------------------------------------------*//

const authorization = async function (req, res, next) {
    // the payload passed as request state from the middleware 
    if (res.locals.apiUser.role) {
        try {
            let user = await User.find({ role: "Admin" })

            if (!user) {
                return res.status(401).send({ status: "1003", message: "" })
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ status: false, message: "Server error, try again later" });
        }
    }
}


const authentication = async function (req, res, next) {
    try {
        const token = req.header('x-auth-header');
        if (!token) return res.status(401).send('Access Denied: No Token Provided!');
        const decoded = jwt.verify(token, "secretkey");
        if (role[decoded.role].find(function (url) { return url == req.baseUrl })) {
            req.user = decoded
            next();
        }
        else
            return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    }
    catch (ex) {
        res.status(401).send('Invalid Token')
    }
}

module.exports = authorization

