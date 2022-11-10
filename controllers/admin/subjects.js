const db = require("../../models")
const { Subject } = db


//========================================POST /CREATE-SUBJECT==========================================================//

const create = async function (req, res) {
    try {

        let data=req.body

        const subjectCreated = await Subject.create(data)

        let subjectDetails = {
                className: data.className,
                subjectCode: data.subjectCode,
                subjectName: data.subjectName, 
        }

        res.status(201).send({ status: 1009, message: "A new Subject has been created successfully", SubjectDetails: subjectDetails })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================GET/ GET-ALL-SUBJECTS==========================================================//

const index = async function (req, res) {
    try {

        const subjectData = await Subject.findAll({ attributes: ['subjectCode','subjectName'] })

        if (subjectData.length == 0) {
            return res.status(422).send({ status: 1006, message: "No Subjects Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Subjects including className assigned for your refrence', data: subjectData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


//========================================POST/UPDATE-A-SUBJECT==========================================================//

const update = async function (req, res) {
    try {
        const subjectId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: subjectId } };
        const options = { multi: true };

        const updateSubject = await Subject.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered subject details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


//========================================DELETE/ DELETE-A-SUBJECT==========================================================//

const destroy = async function (req, res) {
    try {

        let subjectId = req.params.id

        let checkSubject = await Subject.findOne({ where: { id: subjectId } });

        if (!checkSubject) {
            return res.status(422).send({ status: 1011, message: "Subject is Already Deleted" })
        }

        let deleteSubject = await Subject.destroy({ where: { id: subjectId } })

        return res.status(200).send({ status: 1010, message: 'Subject has been deleted Successfully', data: deleteSubject })
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