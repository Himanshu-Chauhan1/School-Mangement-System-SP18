const { classM } = require("../../models/index")


//========================================POST /CREATE-CLASS==========================================================//

const create = async function (req, res) {
    try {

        const classCreated = await classM.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Class has been created successfully", data: classCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create
}