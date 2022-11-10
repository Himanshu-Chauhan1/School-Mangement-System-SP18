const db = require("../../models")
const { Teacher } = db


//========================================POST /CREATE-TEACHER==========================================================//

const create = async function (req, res) {
    try {

        let data=req.body

        const teacherCreated = await Teacher.create(req.body)

        let teacher={
            fullName: data.fullName,
            gender: data.gender,
            dob: data.dob,
            email: data.email,
            mobile: data.mobile,
            joiningDate: data.joiningDate,
        }

        res.status(201).send({ status: 1009, message: "A new Teacher has been created successfully", data: teacher })

    } catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================GET/ GET-ALL-TEACHERS==========================================================//

const index = async function (req, res) {
    try {

        const teacherData = await Teacher.findAll({ attributes: ['fullName','gender','dob','email','mobile','joiningDate'] })

        if (teacherData.length == 0) {
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

const update = async function (req, res) {
    try {
        const teacherId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: teacherId } };
        const options = { multi: true };

        const updateTeacher = await Teacher.update(values, condition, options)


        return res.status(200).send({ status: 1010, msg: "The entered teacher details has been updated Succesfully", upadtedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-TEACHER==========================================================//

const destroy = async function (req, res) {
    try {

        let teacherId = req.params.id

        let checkTeacher = await Teacher.findOne({ where: { id: teacherId } });

        if (!checkTeacher) {
            return res.status(422).send({ status: 1011, message: "Teacher is Already Deleted" })
        }

        let deleteTeacher = await Teacher.destroy({ where: { id: teacherId } })

        return res.status(200).send({ status: 1010, message: 'Teacher has been deleted Successfully', data: deleteTeacher })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    index,
    update,
    destroy
}