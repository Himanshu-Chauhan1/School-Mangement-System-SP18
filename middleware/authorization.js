const jwt = require("jsonwebtoken")
const db = require("../models")
const { User } = db


//----------------------------------------authorization----------------------------------------------------*//

const authorization = async function (req, res, next) {
    try {
        const verifiedtoken = req.verifiedtoken

        const user = await User.findByPk(verifiedtoken.id)
        const userRole = user.role

        let tokenRole = verifiedtoken.role

        if (tokenRole !== userRole) {
            return res.status(401).send({ Status: 1010, message: "Access DeniedYou dont have correct privilege to perform this operation" });
        } else {
            next()
        }

    } catch (error) {
        res.status(401).send({ status: 1010, message: "Something is wrong please check back again after sometime" });
    }
}

module.exports = { authorization }


