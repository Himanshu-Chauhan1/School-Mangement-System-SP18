const db = require("../../models")
const { Admission, Class, Student } = db
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

//////////////// -FOR EMAIL- ///////////////////////
const isValidEmail = (email) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

//////////////// -FOR MOBILE- ///////////////////////
const isValidMobile = (mobile) => {
    return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile);
};

//////////////// -FOR YEAR- ///////////////////////
const isValidYear = (year) => {
    return /^[12][0-9]{3}$/.test(year);
};



//========================================CreateAdmission==========================================================//

const create = async function (req, res, next) {
    try {
        const data = req.body

        const { fullName, gender, fatherName, motherName, permanentAddress, currentAddress, district, dob, religion, email, mobile, year, enrollDate, className, studentId, isApproved } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(fullName)) {
            return res.status(422).send({ status: 1002, message: "Full Name is required" })
        }

        if (!isValidFullName(fullName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid Full Name" })
        }

        if (!isValid(gender)) {
            return res.status(422).send({ status: 1002, message: "Gender is required" })
        }

        if (!isValidGender(gender)) {
            return res.status(422).send({ status: 1003, message: "Invalid gender" })
        }

        if (!isValid(fatherName)) {
            return res.status(422).send({ status: 1002, message: "Father Name is required" })
        }

        if (!isValidFullName(fatherName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid Father Name" })
        }

        if (!isValid(motherName)) {
            return res.status(422).send({ status: 1002, message: "Mother Name is required" })
        }

        if (!isValidFullName(motherName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid Mother Name" })
        }

        if (!isValid(permanentAddress)) {
            return res.status(422).send({ status: 1002, message: "Permanent address is Required" })
        }

        if (!isValid(currentAddress)) {
            return res.status(422).send({ status: 1002, message: "Current address is Required" })
        }

        if (!isValid(district)) {
            return res.status(422).send({ status: 1002, message: "District is required" })
        }

        if (!isValidFullName(district)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid District Name" })
        }

        if (!isValid(dob)) {
            return res.status(422).send({ status: 1002, message: "Date of Birth is Required" })
        }

        if (!isvalidBirthdate(dob)) {
            return res.status(422).send({ status: 1003, message: "Please enter date of birth from the past Only, It cannot current year or greater from the current year" })
        }

        if (!isValid(religion)) {
            return res.status(422).send({ status: 1002, message: "Date of Birth is Required" })
        }

        if (!(religion == 'Hinduism' || religion == 'Muslim' || religion == 'Christian' || religion == 'Sikhism' || religion == 'Jainism,' || religion == 'Other')) {
            return res.status(422).send({ status: 1003, message: "Religion only can be Hinduism, Muslim, Christian, Sikhism, Jainism and Other Only" })
        }

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        const isRegisteredEmail = await Admission.findOne({ where: { email: email } });

        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "Email id already registered" })
        }

        if (!isValid(mobile)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!isValidMobile(mobile)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid Phone no" })
        }

        const isRegisteredMobile = await Admission.findOne({ where: { mobile: mobile } });

        if (isRegisteredMobile) {
            return res.status(422).send({ status: 1008, message: "Mobile number is already registered" })
        }

        if (!isValid(year)) {
            return res.status(422).send({ status: 1002, message: "Year is required" })
        }

        if (!isValidYear(year)) {
            return res.status(422).send({ status: 1003, message: "Please enter a Valid year" })
        }

        if (!isValid(enrollDate)) {
            return res.status(422).send({ status: 1002, message: "Enroll Date is required" })
        }

        if (!validateDate(enrollDate)) {
            return res.status(422).send({ status: 1003, message: "Invalid Enroll Date or Please enter date of enroll in the correct format" })
        }

        if (!isValid(studentId)) {
            return res.status(422).send({ status: 1002, message: "StudentId is required" })
        }

        const isRegisteredStudentId = await Student.findOne({ where: { id: studentId } });

        if (!isRegisteredStudentId) {
            return res.status(422).send({ status: 1003, message: "Invalid StudentId" })
        }

        if (!isValidFullName(className)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid Class Name" })
        }

        const isRegisteredClassName = await Class.findOne({ where: { className: className } });

        if (!isRegisteredClassName) {
            return res.status(422).send({ status: 1008, message: "Invalid className" })
        }

        if ("isApproved" in data) {
            if (!isValid(isApproved)) {
                return res.status(422).send({ status: 1002, message: "isApproved is required" })
            }

            data.isApproved = isApproved
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

        const classId = req.params.id;

        if (!isValid(classId)) {
            return res.status(422).send({ status: 1003, message: "ClassId is not valid" })
        }

        const enteredClass = await Class.findByPk(classId)

        if (!enteredClass) {
            return res.status(422).send({ status: 1006, message: "Provided classId does not exists" })
        }

        const data = req.body

        const { className, departmentName, classShift } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("className" in data) {
            if (!isValid(className)) {
                return res.status(422).send({ status: 1002, message: "className is required" })
            }

            const isRegisteredClassName = await Class.findOne({ where: { className: className } });

            if (isRegisteredClassName) {
                return res.status(422).send({ status: 1008, message: "ClassName is already registered please enter a new one to update" })
            }

            dataObject['className'] = className
        }

        if ("departmentName" in data) {
            if
                (!isValid(departmentName)) {
                return res.status(422).send({ status: 1002, message: "departmentName is required" })
            }

            if (!isValidFullName(departmentName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid departmentName" })
            }

            const isRegisteredDepartmentName = await Class.findOne({ where: { departmentName: departmentName } });

            if (isRegisteredDepartmentName) {
                return res.status(422).send({ status: 1008, message: "Entered departmentName is same please enter a new one to update" })
            }

            dataObject['departmentName'] = departmentName
        }

        if ("classShift" in data) {

            if (!isValid(classShift)) {
                return res.status(422).send({ status: 1002, message: "Class Shift is required" })
            }

            if (!isValidShift(classShift)) {
                return res.status(422).send({ status: 1003, message: "Please enter class shift in a format of like 9am-5pm" })
            }

            const isRegisteredClassShift = await Class.findOne({ where: { classShift: classShift } });

            if (isRegisteredClassShift) {
                return res.status(422).send({ status: 1008, message: "Entered classShift is same please enter a new one to update" })
            }

            dataObject['classShift'] = classShift
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

