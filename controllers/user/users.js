require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models")
const { User } = db



//========================================POST /register==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await User.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST /login==========================================================

let login = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(422).send({ status: 1003, message: "Invalid Email credentials" });
        }

        let checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid Password credentials" })

        const userRole = await User.findAll({ where: { email: email }, attributes: ['role'], limit: 1, order: [["id", "DESC"]], })

        const payload = {}
        const option = {
            expiresIn: "4h",
            issuer: "sparkeighteen.com"
        };

        const token = jwt.sign({ id: user.id, role: user.role, payload, option }, process.env.SECRET_KEY);

        const userData = {
            token: token,
            userRole: userRole
        }

        return res.status(200).send({ status: 1010, message: "You have been successfully logged in", data: userData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


module.exports = {
    create,
    login
}