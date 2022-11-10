const db = require("../../models")
const { Admission, Student } = db



//========================================POST /CREATE-ADMISSION==========================================================//

const create = async function (req, res) {
    try {
        const data = req.body

        const { studentId } = data

        const admissionCreated = await Admission.create(req.body)

        const values = { requestApproved: data.isApproved }
        const condition = { where: { id: studentId } };
        const options = { multi: true};

        const updatedStudentData = await Student.update(values, condition, options)

        let response = {
            admissionApprovedstatus: admissionCreated,
            updatedStudentData: values
        }

        res.status(201).send({ status: 1009, message: "A new admission has been created successfully", data: response })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }

}


//========================================GET/GET-ALL-ADMISSION==========================================================//

const index = async function (req, res) {
    try {

        let admissionData = await Admission.findAll()

        if (admissionData.length == 0) {
            return res.status(422).send({ status: 1006, message: "No Admissions Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Admissions', data: admissionData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================POST/UPDATE-A-ADMISSION==========================================================//

const update = async function (req, res) {
    try {
        const admissionId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: admissionId } };
        const options = { multi: true };

        const updateAdmission = await Admission.update(values, condition, options)

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

        let admissionId = req.params.id

        let checkAdmission = await Admission.findOne({ where: { id: admissionId } });

        if (!checkAdmission) {
            return res.status(422).send({ status: 1011, message: "Admission is Already Deleted" })
        }

        let deleteAdmission = await Admission.destroy({ where: { id: admissionId } })

        return res.status(200).send({ status: 1010, message: 'Admission has been deleted Successfully', data: deleteAdmission })
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
