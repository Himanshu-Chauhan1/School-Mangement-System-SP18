const { subject } = require("../../models/index")


//========================================POST /CREATE-SUBJECT==========================================================//

const create = async function (req, res) {
    try {

        const subjectCreated = await subject.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Subject has been created successfully", data: subjectCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create
}