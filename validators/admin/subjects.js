const isvalidBirthdate = require("is-valid-birthdate")
const validateDate = require("validate-date");
const { subject } = require("../../models/index");


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

        const isRegisteredSubjectCode = await subject.findOne({ where: { subjectCode: subjectCode } });

        if (isRegisteredSubjectCode) {
            return res.status(422).send({ status: 1008, message: "subjectCode is already registered" })
        }

        if (!isValid(subjectName)) {
            return res.status(422).send({ status: 1002, message: "Subject name is required" })
        }

        if (!isValidFullName(subjectName)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid subject name" })
        }

        const isRegisteredSubjectName = await subject.findOne({ where: { subjectName: subjectName } });

        if (isRegisteredSubjectName) {
            return res.status(422).send({ status: 1008, message: "subjectName is already registered" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================updateSubject==========================================================//

const updateSubjectValidation = async function (req, res, next) {
    try {

        const subjectId = req.params.id;

        if (!isValid(subjectId)) {
            return res.status(422).send({ status: 1003, message: "SubejectId is not valid" })
        }

        const enteredSubject = await subject.findByPk(subjectId)

        if (!enteredSubject) {
            return res.status(422).send({ status: 1006, message: "Provided subjectId does not exists" })
        }

        const data = req.body

        const { subjectCode, subjectName } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("subjectCode" in data) {
            if (!isValid(subjectCode)) {
                return res.status(422).send({ status: 1002, message: "SubjectCode is required" })
            }

            const isRegisteredSubjectCode = await subject.findOne({ where: { subjectCode: subjectCode } });

            if (isRegisteredSubjectCode) {
                return res.status(422).send({ status: 1008, message: "subjectCode is already registered please enter a new one to update" })
            }

            dataObject['subjectCode'] = subjectCode
        }

        if ("subjectName" in data) {
            if (!isValid(subjectName)) {
                return res.status(422).send({ status: 1002, message: "SubjectName is required" })
            }

            if (!isValidFullName(subjectName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid subject name" })
            }

            const isRegisteredSubjectName = await subject.findOne({ where: { subjectName: subjectName } });

            if (isRegisteredSubjectName) {
                return res.status(422).send({ status: 1008, message: "subjectName is already registered please enter a new one to update" })
            }
            dataObject['subjectName'] = subjectName
        }

        next()

    } catch (error) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================DeleteSubject==========================================================//

const deleteSubjectValidation = async function (req, res, next) {
    try {

        let subjectId = req.params.id

        if (!subjectId) {
            return res.status(422).send({ status: 1002, message: "Please enter a subject-Id" })
        }

        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    createSubjectValidation,
    updateSubjectValidation,
    deleteSubjectValidation
}
