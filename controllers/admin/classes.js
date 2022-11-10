const db = require("../../models")
const { Class } = db


//========================================POST /CREATE-CLASS==========================================================//

const create = async function (req, res) {
    try {

        let data=req.body

        const classCreated = await Class.create(req.body)

        let response={
            className: data.className,
            departmentName: data.departmentName,
            classShift: data.classShift
        }

        res.status(201).send({ status: 1009, message: "A new Class has been created successfully", data: response })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}


//========================================GET/ GET-ALL-CLASSES==========================================================//

const index = async function (req, res) {
    try {

        const classData = await Class.findAll({ attributes: ['className','departmentName','classShift'] })

        if (classData.length == 0) {
            return res.status(422).send({ status: 1006, message: "No Classes Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Classes', data: classData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================POST/UPDATE-A-CLASS==========================================================//

const update = async function (req, res) {
    try {
        const classId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: classId } };
        const options = { multi: true };

        const updateClass = await Class.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered class details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-CLASS==========================================================//

const destroy = async function (req, res) {
    try {

        let classId = req.params.id

        let checkClass = await Class.findOne({ where: { id: classId } });

        if (!checkClass) {
            return res.status(422).send({ status: 1011, message: "Class is Already Deleted" })
        }

        let deleteClass = await Class.destroy({ where: { id: classId } })

        return res.status(200).send({ status: 1010, message: 'Class has been deleted Successfully', data: deleteClass })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    index,
    update,
    destroy
}