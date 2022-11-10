const db = require("../../models")
const { Admission, Class, Student } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || typeof value == "boolean" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR ISAPPROVED- ///////////////////////
const isValidIsApproved = (isApproved) => {
    return /^(true|false|True|False)$/.test(isApproved);
};


//========================================CreateAdmission==========================================================//

const create = async function (req, res, next) {
    try {
        const data = req.body

        const { studentId, isApproved } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(studentId)) {
            return res.status(422).send({ status: 1002, message: "StudentId is required" })
        }

        const isRegisteredStudentId = await Student.findOne({ where: { id: studentId } });

        if (!isRegisteredStudentId) {
            return res.status(422).send({ status: 1003, message: "Invalid StudentId or studentId does not exists" })
        }

        if (!isValid(isApproved)) {
            return res.status(422).send({ status: 1002, message: "isApproved is required" })
        }

        if (!isValidIsApproved(isApproved)) {
            return res.status(422).send({ status: 1002, message: "isApproved is can be only either true or false" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================updateAdmission==========================================================//

const update = async function (req, res, next) {
    try {

        const admissionId = req.params.id;

        if (!isValid(admissionId)) {
            return res.status(422).send({ status: 1003, message: "Admission-Id is not valid" })
        }

        const enteredClass = await Class.findByPk(admissionId)

        if (!enteredClass) {
            return res.status(422).send({ status: 1006, message: "Provided Admission-Id does not exists" })
        }

        const data = req.body

        const { studentId, isApproved } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("studentId" in data) {
            if (!isValid(studentId)) {
                return res.status(422).send({ status: 1002, message: "studentId is required" })
            }

            const isRegisteredAdmission = await Student.findOne({ where: { id: studentId } });

            if (isRegisteredAdmission) {
                return res.status(422).send({ status: 1008, message: "Student-Id is same please enter a new one to update" })
            }

            dataObject['studentId'] = studentId
        }

        if ("isApproved" in data) {
            if
                (!isValid(isApproved)) {
                return res.status(422).send({ status: 1002, message: "isApproved is required" })
            }

            if (!isValidIsApproved(isApproved)) {
                return res.status(422).send({ status: 1002, message: "isApproved is can be only either true or false" })
            }

            const isRegisteredAdmission = await Student.findOne({ where: { id: studentId } });

            if (isRegisteredAdmission) {
                return res.status(422).send({ status: 1008, message: "Student-Id is same please enter a new one to update" })
            }

            const isRegisteredIsApproved = await Admission.findOne({ where: { isApproved: isApproved } });

            if (isRegisteredIsApproved) {
                return res.status(422).send({ status: 1003, message: "Entered isApproved is same please enter a new one to update" })
            }

            dataObject['isApproved'] = isApproved
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================DeleteAdmission==========================================================//

const destroy = async function (req, res, next) {
    try {

        let admissionId = req.params.id

        if (!admissionId) {
            return res.status(422).send({ status: 1002, message: "Please enter a admission-Id" })
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

