const { classM } = require("../../models/index")


//========================================POST /CREATE-CLASS==========================================================//

const create = async function (req, res) {
    try {

        const classCreated = await classM.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Class has been created successfully", data: classCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}


//========================================GET/ GET-ALL-CLASSES==========================================================//

const getAllClasses = async function (req, res) {
    try {

        let classData = await classM.findAll()

        if (!classData) {
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

const updateClassById = async function (req, res) {
    try {
        const classId = req.params.id;
        let dataObject=req.body

        const values = dataObject;
        const condition = { where :{id: classId}}; 
        const options = { multi: true };

        const updateClass = await classM.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered class details has been Updated Succesfully", updatedData: values})
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-CLASS==========================================================//

const deleteClassById = async function (req, res) {
    try {

        let classId = req.params.id

        let checkClass = await classM.findOne({ where: { id: classId } });

        if (!checkClass) {
            return res.status(422).send({ status: 1011, message: "Class is Already Deleted" })
        }

        let deleteClass = await teacher.destroy({ where: { id: teacherId } })

        return res.status(200).send({ status: 1010, message: 'Class has been deleted Successfully', data: deleteClass })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    getAllClasses,
    updateClassById,
    deleteClassById
}