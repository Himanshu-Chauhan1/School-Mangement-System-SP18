const db = require("../../models")
const { Class } = db


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

//////////////// -FOR CLASS SHIFT- ///////////////////////
const isValidShift = (classShift) => {
    return /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)$/gm.test(classShift);
};


//========================================CreateClass==========================================================//

const create = async function (req, res, next) {
    try {
        const data = req.body

        const { className, departmentName, classShift } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(className)) {
            return res.status(422).send({ status: 1002, message: "Class Name is required" })
        }

        const isRegisteredClassName = await Class.findOne({ where: { className: className } });

        if (isRegisteredClassName) {
            return res.status(422).send({ status: 1008, message: "className is already registered" })
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
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================updateClass==========================================================//

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

//========================================DeleteClass==========================================================//

const destroy = async function (req, res, next) {
    try {

        let classId = req.params.id

        if (!classId) {
            return res.status(422).send({ status: 1002, message: "Please enter a class-Id" })
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
