const db = require("../../models")
const { Student, Admission } = db


//========================================POST /CREATE-ADMISSION-==========================================================//

const create = async function (req, res) {
    try {

        const admissionCreated = await Student.create(req.body)

        res.status(201).send({ status: 1009, message: "Your request for admission has been submitted succesfully", data: admissionCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }

}


//========================================GET/GET-A-ADMISSION==========================================================//

const index = async function (req, res) {
    try {

        let studentId = req.params.id

        let admissionData = await Student.findByPk(studentId)

        if (!admissionData) {
            return res.status(422).send({ status: 1006, message: "Student-Id does not exits or Invalid....." });
        }

        let response = {
            admissionApplicationStatus: admissionData,
        }

        return res.status(200).send({ status: 1010, message: 'Your submitted details for admission and approved status to proceed furthet', data: response })
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
    index,
    update,
    destroy
}
