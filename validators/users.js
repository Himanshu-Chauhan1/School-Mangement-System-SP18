const db = require("../models")
const { User } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR FULLNAME- ///////////////////////
const isValidFullName = (fullName) => {
    return /^[a-zA-Z ]+$/.test(fullName);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidMobile = (mobile) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//========================================Create-A-Student==========================================================//

const createStudent = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, email, mobile, password } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "FullName is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await User.findOne({ where: { email: email } });

        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "Email id already registered" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await User.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "Mobile number is already registered" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }
        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }
        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Create-A-Admin==========================================================//

const createAdmin = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, email, mobile, password, role } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "FullName is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await User.findOne({ where: { email: email } });

        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "Your are must be a admin to register with this Email-Id"})
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await User.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "Your are must be a admin to register with this Mobile No." })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }
        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }
        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        if (!isValid(role)) {
            return res.status(422).send({ status: 1002, message: "Role is required" })
        }

        if (!(role == 'admin' || role == 'Admin')) {
            return res.status(422).send({ status: 1003, message: "Role can be admin Only" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================Login-In-A-Account==========================================================//

let login = async (req, res, next) => {
    try {
        const data = req.body;
        let { email, password} = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


module.exports = {
    createStudent,
    createAdmin,
    login
}







