const db = require("../../models")
const { Student } = db


//========================================POST /CREATE-ADMISSION-==========================================================//

const create = async function (req, res) {
    try {

        const admissionCreated = await Student.create(req.body)

        res.status(201).send({ status: 1009, message: "Your request for admission has been submitted succesfully", data: admissionCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }

}


//========================================GET/GET-ALL-ADMISSION==========================================================//

const get = async function (req, res) {
    try {

        let admissionData = await Student.findAll()

        if (!admissionData) {
            return res.status(422).send({ status: 1006, message: "No Students Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Students who have requested for admission', data: admissionData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================POST/UPDATE-A-ADMISSION==========================================================//

const update = async function (req, res) {
    try {
        const studentId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: studentId } };
        const options = { multi: true };

        const updateAdmission = await Student.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered admission details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-ADMISSION==========================================================//

const destroy = async function (req, res) {
    try {

        let studentId = req.params.id

        let checkAdmission = await Student.findOne({ where: { id: studentId } });

        if (!checkAdmission) {
            return res.status(422).send({ status: 1011, message: "This Admission request is Already Deleted" })
        }

        let deleteAdmissionRequest = await Student.destroy({ where: { id: studentId } })

        return res.status(200).send({ status: 1010, message: 'Your request for admission has been deleted Successfully', data: deleteAdmissionRequest })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    get,
    update,
    destroy
}
