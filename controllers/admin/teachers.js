const { teacher } = require("../../models/index")


//========================================POST /CREATE-TEACHER==========================================================//

const create = async function (req, res) {
    try {

        const teacherCreated = await teacher.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Teacher has been created successfully", data: teacherCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create
}