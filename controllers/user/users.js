require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models");
const { hours } = require("milliseconds");
const { User, Teacher } = db



//========================================POST /CREATE-A-STUDENT,ADMIN.TEACHER==========================================================//

const create = async function (req, res) {
    try {

        const accountCreated = await User.create(req.body)

        res.status(201).send({ status: 1009, message: "You have been registered successfully", data: accountCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST /LOGIN-FOR-STUDENT,ADMIN,TEACHER==========================================================

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
            expiresIn: "3seconds",
            issuer: "sparkeighteen.com"
        };

        const token = jwt.sign({ id: user.id, role: user.role, payload, option }, process.env.SECRET_KEY)

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

//========================================POST/UPDATE-A-STUDENT,ADMIN,TEACHER==========================================================//

const update = async function (req, res) {
    try {
        const userId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: userId } };
        const options = { multi: true };

        const updateClass = await User.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};
//========================================GET/ GET-ALL-USERS(STUDENTS,ADMINS,TEACHERS)==========================================================//

const index = async function (req, res) {
    try {

        const studentData = await User.findAll({ where: { role: ['student', 'Student'] }, attributes: ['fullName', 'email', 'mobile'] })
        const adminData = await User.findAll({ where: { role: ['admin', 'Admin'] }, attributes: ['fullName', 'email', 'mobile'] })
        const teacherData = await User.findAll({ where: { role: ['teacher', 'Teacher'] }, attributes: ['fullName', 'email', 'mobile'] })

        if (teacherData.length == 0 || adminData.length == 0 || studentData == 0) {
            return res.status(422).send({ status: 1006, message: "No Users Found....." });
        }

        const value = await db.TimeTable.findOne({ where: { startTime: startTime } })

        console.log(value);

        let response = {
            Students: studentData,
            Admins: adminData,
            Teachers: teacherData
        }

        return res.status(200).send({ status: 1010, message: 'All Users', data: response })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-STUDENT,ADMIN,TEACHER==========================================================//

const destroy = async function (req, res) {
    try {

        let userId = req.params.id

        let checkUser = await User.findOne({ where: { id: userId }, attributes: ['fullName'] });

        if (!checkUser) {
            return res.status(422).send({ status: 1011, message: 'The User with this Id is already deleted' })
        }

        let deleteUser = await User.destroy({ where: { id: userId } })

        return res.status(200).send({ status: 1010, message: `${deleteUser} has been deleted Successfully`, data: deleteUser })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}



module.exports = {
    create,
    login,
    update,
    index,
    destroy
}