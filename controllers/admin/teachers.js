const { teacher } = require("../../models/index")


//========================================POST /CREATE-TEACHER==========================================================//

const create = async function (req, res) {
    try {

        const teacherCreated = await teacher.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Teacher has been created successfully", data: teacherCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================GET/ GET-ALL-TEACHERS==========================================================//

const getAllTeacher = async function (req, res) {
    try {

        let teacherData = await teacher.findAll()

        if (!teacherData) {
            return res.status(422).send({ status: 1006, message: "No Teachers Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Teachers', data: teacherData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================POST/UPDATE-A-TEACHER==========================================================//

const updateTeacherById = async function (req, res) {
    try {
        const teacherId = req.params.id;
        let dataObject=req.body

        const values = dataObject;
        const condition = { where :{id: teacherId}}; 
        const options = { multi: true };

        const updateTeacher = await teacher.update(values, condition, options)

        return res.status(200).send({ status: 1010, msg: "The entered teacher details has been updated Succesfully", upadtedData: values})
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-TEACHER==========================================================//

const deleteTeacherById = async function (req, res) {
    try {

        let teacherId = req.params.id

        let checkTeacher = await teacher.findOne({ where: { id: teacherId } });

        if (!checkTeacher) {
            return res.status(422).send({ status: 1011, message: "Teacher is Already Deleted" })
        }

        let deleteTeacher = await teacher.destroy({ where: { id: teacherId } })

        return res.status(200).send({ status: 1010, message: 'Teacher has been deleted Successfully', data: deleteTeacher })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    getAllTeacher,
    updateTeacherById,
    deleteTeacherById
}