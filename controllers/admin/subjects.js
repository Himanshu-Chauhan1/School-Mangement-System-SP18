const { subject } = require("../../models/index")


//========================================POST /CREATE-SUBJECT==========================================================//

const create = async function (req, res) {
    try {

        const subjectCreated = await subject.create(req.body)

        res.status(201).send({ status: 1009, message: "A new Subject has been created successfully", data: subjectCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================GET/ GET-ALL-SUBJECTS==========================================================//

const getAllSubjects = async function (req, res) {
    try {

        let subjectData = await subject.findAll()

        if (!subjectData) {
            return res.status(422).send({ status: 1006, message: "No Subjects Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Subjects', data: subjectData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


//========================================POST/UPDATE-A-SUBJECT==========================================================//

const updateSubjectById = async function (req, res) {
    try {
        const subjectId = req.params.id;
        let dataObject=req.body

        const values = dataObject;
        const condition = { where :{id: subjectId}}; 
        const options = { multi: true };

        const updateSubject = await subject.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered subject details has been Updated Succesfully", updatedData: values})
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


//========================================DELETE/ DELETE-A-SUBJECT==========================================================//

const deleteSubjectById = async function (req, res) {
    try {

        let subjectId = req.params.id

        let checkSubject = await subject.findOne({ where: { id: subjectId } });

        if (!checkSubject) {
            return res.status(422).send({ status: 1011, message: "Subject is Already Deleted" })
        }

        let deleteSubject = await teacher.destroy({ where: { id: teacherId } })

        return res.status(200).send({ status: 1010, message: 'Subject has been deleted Successfully', data: deleteSubject })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    getAllSubjects,
    updateSubjectById,
    deleteSubjectById
}