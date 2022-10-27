const isvalidBirthdate = require("is-valid-birthdate")
const validateDate = require("validate-date")


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

//========================================CreateSubject==========================================================//

const createSubjectValidation = async function (req, res, next) {
    try {
        const data = req.body

        const { subjectCode, subjectName } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(subjectCode)) {
            return res.status(422).send({ status: 1002, message: "Subject Code is required" })
        }

        // if (subjectCode.match(isValidSubjectCode)) {
        //     var splitted = subjectCode.split(isValidSubjectCode);
        //     console.log(splitted.length);
        //     if (splitted.length > 1) {
        //       splitted.forEach(function(value, index) {
        //         if ((value != '') && (value != undefined))
        //           console.log(value, index);
        //       });
        //     }
        //   } else {
        //     return res.status(422).send({ status: 1003, message: "Please enter a valid subject code" })
        //   }

        if (!isValid(subjectName)) {
            return res.status(422).send({ status: 1002, message: "Subject name is required" })
        }

        if (!isValidFullName(subjectName)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid subject name" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    createSubjectValidation
}
