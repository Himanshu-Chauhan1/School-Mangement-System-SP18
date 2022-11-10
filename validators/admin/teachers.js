const isvalidBirthdate = require("is-valid-birthdate")
const validateDate = require("validate-date")
const db = require("../../models")
const { Teacher } = db


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

//////////////// -FOR GENDER- ///////////////////////
const isValidGender = (gender) => {
    return /^(?:m|M|male|Male|f|F|female|Female|O|Other|other)$/m.test(gender);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidMobile = (mobile) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile);
};

//========================================CreateUser==========================================================//

const create = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, gender, address, dob, email, mobile, joiningDate } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "FullName is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid fullName" })
        }

        if (!isValid(gender)) {
            return res.status(422).send({ status: 1002, message: "Gender is required" })
        }

        if (!isValidGender(gender)) {
            return res.status(422).send({ status: 1003, message: "Invalid gender" })
        }

        if (!isValid(address)) {
            return res.status(422).send({ status: 1002, message: "Address is Required" })
        }

        if (!isValid(dob)) {
            return res.status(422).send({ status: 1002, message: "Date of Birth is Required" })
        }

        if (!isvalidBirthdate(dob)) {
            return res.status(422).send({ status: 1003, message: "Please enter date of birth from the past Only, It cannot current year or greater from the current year" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await Teacher.findOne({ where: { email: email } });

        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "Email id already registered" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await Teacher.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "Mobile number is already registered" })
        }

        if (!isValid(joiningDate)) {
            return res.status(422).send({ status: 1002, message: "Date of Joining is Required" })
        }

        if (!validateDate(joiningDate)) {
            return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================updateTeacher==========================================================//

const update = async function (req, res, next) {
    try {

        const teacherId = req.params.id;

        if (!isValid(teacherId)) {
            return res.status(422).send({ status: 1003, message: " teacherId is not valid" })
        }

        const enteredTeacher = await Teacher.findByPk(teacherId)

        if (!enteredTeacher) {
            return res.status(422).send({ status: 1006, message: "Provided teacherId does not exists" })
        }

        const data = req.body

        const { fullName, gender, address, dob, email, mobile, joiningDate } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("fullName" in data) {
            if (!isValid(fullName)) {
                return res.status(422).send({ status: 1002, message: "Full Name name is required" })
            }
            dataObject['fullName'] = fullName
        }

        if ("gender" in data) {
            if (!isValid(gender)) {
                return res.status(422).send({ status: 1002, message: "Gender is required" })
            }
            dataObject['gender'] = gender
        }

        if ("address" in data) {
            if (!isValid(address)) {
                return res.status(422).send({ status: 1002, message: "Address is required" })
            }

            dataObject['address'] = address
        }

        if ("dob" in data) {
            if (!isValid(dob)) {
                return res.status(422).send({ status: 1002, message: "Date of birth is required" })
            }

            if (!isvalidBirthdate(dob)) {
                return res.status(422).send({ status: 1003, message: "Please enter date of birth from the past Only, It cannot current year or greater from the current year" })
            }

            dataObject['dob'] = dob
        }

        if ("email" in data) {
            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid Email address" })
            }

            //    -------------------------  check email duplicacy----------------------------------
            let emailCheck = await Teacher.findOne({ where: { email: email } });

            if (emailCheck) return res.status(422).send({ status: 1008, message: "EmailId already Registerd" })
            dataObject['email'] = email
        }

        if ("mobile" in data) {
            if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(mobile)) {
                return res.status(422).send({ status: 1003, msg: "Please provide a valid mobile number" })
            }
            //    -------------------------  check mobile duplicacy----------------------------------
            let mobileCheck = await Teacher.findOne({ where: { mobile: mobile } });

            if (mobileCheck) {
                return res.status(422).send({ status: 1008, message: "Phone Number already exists" })
            }

            dataObject['mobile'] = mobile
        }


        if ("joiningDate" in data) {
            if (!isValid(joiningDate)) {
                return res.status(422).send({ status: 1002, Message: "joiningDate is required" })
            }

            if (!validateDate(joiningDate)) {
                return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format" })
            }

            dataObject['joiningDate'] = joiningDate
        }

        next()

    } catch (error) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================DeleteTeacher==========================================================//

const destroy = async function (req, res, next) {
    try {

        let teacherId = req.params.id

        if (!teacherId) {
            return res.status(422).send({ status: 1002, message: "Please enter a teacher-Id" })
        }

        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    create,
    update,
    destroy
}
