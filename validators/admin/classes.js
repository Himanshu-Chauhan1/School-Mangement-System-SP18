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
const isValidShift = (classShift) => {
    return /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)$/gm.test(classShift);
};

//////////////// -FOR SUBJECT CODE- ///////////////////////
const isValidSubjectCode = (subjectCode) => {
    return /([A-Z]{2,})(?:\s*)([0-9]{3,})?$/g.test(subjectCode);
};


//========================================CreateClass==========================================================//

const createClassValidation = async function (req, res, next) {
    try {
        const data = req.body

        const { className, departmentName, classShift } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(className)) {
            return res.status(422).send({ status: 1002, message: "Class Name is required" })
        }

        if (!isValidFullName(className)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid Class Name" })
        }

        if (!isValid(departmentName)) {
            return res.status(422).send({ status: 1002, message: "Department is required" })
        }

        if (!isValid(classShift)) {
            return res.status(422).send({ status: 1002, message: "Class Shift is required" })
        }

        if (!isValidShift(classShift)) {
            return res.status(422).send({ status: 1003, message: "Please enter class shift in a format of like 9am-5pm" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports= {
    createClassValidation
}
