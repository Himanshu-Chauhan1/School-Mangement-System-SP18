const db = require("../../models")
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
            return res.status(422).send({ status: 1008, message: "This Email-Id is already registered with a teacher or admin" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await User.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "This Mobile No. is already registered with a student or admin" })
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
            return res.status(422).send({ status: 1008, message: "This Email-Id is already registered with a student or teacher" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await User.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "This Mobile No. is already registered with a student or teacher" })
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

        data.role = "admin".toLocaleLowerCase()

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================Create-A-Teacher==========================================================//

const createTeacher = async function (req, res, next) {
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
            return res.status(422).send({ status: 1008, message: "This Email-Id is already registered with a student or admin" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await User.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "This Mobile No. is already registered with a student or admin" })
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

        data.role = "teacher".toLocaleLowerCase()

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
        let { email, password } = data

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

//========================================Update-A-Account==========================================================//

const updateStudent = async function (req, res, next) {
    try {

        const studentId = req.params.id;

        if (!isValid(studentId)) {
            return res.status(422).send({ status: 1003, message: "Student-Id is not valid" })
        }

        const enteredId = await User.findByPk(studentId)

        if (!enteredId) {
            return res.status(422).send({ status: 1006, message: "Provided Student-ID does not exists" })
        }

        const data = req.body

        const { fullName, email, mobile, password, role } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("fullName" in data) {
            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "Full Name name is required" })
            }

            const isSameFullName = await User.findOne({ where: { fullName: fullName } });

            if (isSameFullName) {
                return res.status(422).send({ status: 1008, message: "fullname is same please enter a new one to update" })
            }

            dataObject['fullName'] = fullName
        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

            const isSameEmail = await User.findOne({ where: { email: email } });

            if (isSameEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is same please enter a new one to update" })
            }

            const isRegisteredEmail = await User.findOne({ where: { email: email } });

            if (!isRegisteredEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is not registered with any of students" })
            }

            dataObject['email'] = email
        }

        if ("mobile" in data) {

            if (!isValid(mobile)) {
                return res.status(422).send({ status: 1002, message: "Mobile No. is required" })
            }

            if (!isValidMobile(mobile)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Mobile no" })
            }

            const isSameMobile = await User.findOne({ where: { mobile: mobile } });

            if (isSameMobile) {
                return res.status(422).send({ status: 1008, message: "The Mobile No. is same please enter a new one to update" })
            }

            dataObject['mobile'] = mobile
        }

        if ("password" in data) {

            if (!isValid(password)) {
                return res.status(422).send({ status: 1002, message: "Password is required" })
            }

            if (password.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (password.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }

            dataObject['password'] = password
        }

        if ("role" in data) {

            if (!isValid(role)) {
                return res.status(422).send({ status: 1002, message: "Role is required" })
            }

            if (!(role == 'student' ||role == 'Student')) {
                return res.status(422).send({ status: 1002, message: "Role can be Student Only" })
            }

            dataObject['role'] =role
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Admin==========================================================//

const updateAdmin = async function (req, res, next) {
    try {
        const adminId = req.params.id;

        if (!isValid(adminId)) {
            return res.status(422).send({ status: 1003, message: "Admin-Id is not valid" })
        }

        const enteredId = await User.findByPk(adminId)

        if (!enteredId) {
            return res.status(422).send({ status: 1006, message: "Provided Admin-ID does not exists" })
        }

        const data = req.body

        const { fullName, email, mobile, password, role } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("fullName" in data) {
            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "Full Name name is required" })
            }

            const isSameFullName = await User.findOne({ where: { fullName: fullName } });

            if (isSameFullName) {
                return res.status(422).send({ status: 1008, message: "fullname is same please enter a new one to update" })
            }

            dataObject['fullName'] = fullName
        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

            const isSameEmail = await User.findOne({ where: { email: email } });

            if (isSameEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is same please enter a new one to update" })
            }

            dataObject['email'] = email
        }

        if ("mobile" in data) {

            if (!isValid(mobile)) {
                return res.status(422).send({ status: 1002, message: "Mobile No. is required" })
            }

            if (!isValidMobile(mobile)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Mobile no" })
            }

            const isSameMobile = await User.findOne({ where: { mobile: mobile } });

            if (isSameMobile) {
                return res.status(422).send({ status: 1008, message: "The Mobile No. is same please enter a new one to update" })
            }

            dataObject['mobile'] = mobile
        }

        if ("password" in data) {

            if (!isValid(password)) {
                return res.status(422).send({ status: 1002, message: "Password is required" })
            }

            if (password.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (password.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }

            dataObject['password'] = password
        }

        if ("role" in data) {

            if (!isValid(role)) {
                return res.status(422).send({ status: 1002, message: "Role is required" })
            }

            if (!(role == 'admin' ||role == 'Admin')) {
                return res.status(422).send({ status: 1002, message: "Role can be Admin Only" })
            }

            dataObject['role'] =role
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Teacher==========================================================//

const updateTeacher = async function (req, res, next) {
    try {
        const teacherId = req.params.id;

        if (!isValid(teacherId)) {
            return res.status(422).send({ status: 1003, message: "Teacher-Id is not valid" })
        }

        const enteredID = await User.findByPk(teacherId)

        if (!enteredID) {
            return res.status(422).send({ status: 1006, message: "Provided Teacher-ID does not exists" })
        }

        const data = req.body

        const { fullName, email, mobile, password, role} = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("fullName" in data) {
            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "Full Name name is required" })
            }

            const isSameFullName = await User.findOne({ where: { fullName: fullName } });

            if (isSameFullName) {
                return res.status(422).send({ status: 1008, message: "fullname is same please enter a new one to update" })
            }

            dataObject['fullName'] = fullName
        }

        if ("email" in data) {

            if (!isValid(email)) {
                return res.status(422).send({ status: 1002, message: "Email is required" })
            }

            if (!isValidEmail(email)) {
                return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
            }

            const isSameEmail = await User.findOne({ where: { email: email } });

            if (isSameEmail) {
                return res.status(422).send({ status: 1008, message: "This Email-Id is same please enter a new one to update" })
            }

            dataObject['email'] = email
        }

        if ("mobile" in data) {

            if (!isValid(mobile)) {
                return res.status(422).send({ status: 1002, message: "Mobile No. is required" })
            }

            if (!isValidMobile(mobile)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid Mobile no" })
            }

            const isSameMobile = await User.findOne({ where: { mobile: mobile } });

            if (isSameMobile) {
                return res.status(422).send({ status: 1008, message: "The Mobile No. is same please enter a new one to update" })
            }

            dataObject['mobile'] = mobile
        }

        if ("password" in data) {

            if (!isValid(password)) {
                return res.status(422).send({ status: 1002, message: "Password is required" })
            }

            if (password.length < 8) {
                return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
            }
            if (password.length > 15) {
                return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
            }

            dataObject['password'] = password
        }

        if ("role" in data) {

            if (!isValid(role)) {
                return res.status(422).send({ status: 1002, message: "Role is required" })
            }

            if (!(role == 'teacher' ||role == 'Teacher')) {
                return res.status(422).send({ status: 1002, message: "Role can be Teacher Only" })
            }

            dataObject['role'] =role
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Student==========================================================//

const deleteStudent = async function (req, res, next) {
    try {

        let userId = req.params.id

        if (!userId) {
            return res.status(422).send({ status: 1002, message: "Please enter a user-Id" })
        }
        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================Delete-A-Admin==========================================================//

const deleteAdmin = async function (req, res, next) {
    try {

        let userId = req.params.id

        if (!userId) {
            return res.status(422).send({ status: 1002, message: "Please enter a user-Id" })
        }
        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================Delete-A-Admin==========================================================//

const deleteTeacher = async function (req, res, next) {
    try {

        let userId = req.params.id

        if (!userId) {
            return res.status(422).send({ status: 1002, message: "Please enter a user-Id" })
        }
        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createStudent,
    createAdmin,
    createTeacher,
    updateStudent,
    updateAdmin,
    updateTeacher,
    deleteStudent,
    deleteAdmin,
    deleteTeacher,
    login
}







