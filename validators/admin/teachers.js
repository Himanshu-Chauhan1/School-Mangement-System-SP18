const isvalidBirthdate = require("is-valid-birthdate")
const validateDate= require("validate-date")


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


//////////////// -FOR ADDRESS- ///////////////////////
const isValidAddress = (address) => {
    return /^[a-zA-Z0-9\s,'-]*$/m.test(address);
};

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidMobile = (mobile) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile);
};

//////////////// -FOR CLASS SHIFT- ///////////////////////
const isValidShift = (shift) => {
    return /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)$/gm.test(shift);
};

//////////////// -FOR SUBJECT CODE- ///////////////////////
const isValidSubjectCode = (subjectCode) => {
    return /([A-Z]{2,})(?:\s*)([0-9]{3,})?$/g.test(subjectCode);
};

//========================================CreateUser==========================================================//

const createTeacherValidation = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, gender, address, dob, email, mobile, joiningdate } = data

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

        if (!isValidAddress(address)) {
            return res.status(422).send({ status: 1003, message: "Invalid Address, Please enter address in a correct format" })
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

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        if (!isValid(joiningdate)) {
            return res.status(422).send({ status: 1002, message: "Date of Joining is Required" })
        }

        if (!validateDate(joiningdate)) {
            return res.status(422).send({ status: 1003, message: "Invalid Joining Date or Please enter date of joining in the correct format" })
        }
        
        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createTeacherValidation
}
