const { json } = require("sequelize")
const db = require("../../models")
const { Op } = require("sequelize")
const { TimeTable } = db


//========================================POST /CREATE-TEACHER==========================================================//

const create = async function (req, res) {
    try {
        let data = req.body

        const timeTableCreated = await TimeTable.create(req.body)

        const timetable = [{
            class: data.className,
            classShift: data.classShift,
            day: data.day
        }, {
            time: { startTime: data.startTime, endTime: data.endTime },
            subjectName: data.subjectName,
            teacherName: data.teacherName
        }
        ]

        res.status(201).send({ status: 1009, message: "A new TimeTable has been created successfully", data: timetable })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================GET/ GET-ALL-TEACHERS==========================================================//

const index = async function (req, res) {
    try {

        const timeTableData = await TimeTable.findAll({ attributes: ['className','classShift','day', 'startTime', 'endTime', 'subjectName', 'teacherName'] })

        if (timeTableData.length == 0) {
            return res.status(422).send({ status: 1006, message: "No TimeTable Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All TimeTables including class:', Timetable: timeTableData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};



//========================================POST/UPDATE-A-TEACHER==========================================================//

const update = async function (req, res) {
    try {
        const timeTableId = req.params.id;
        let dataObject = req.body

        const values = dataObject;
        const condition = { where: { id: timeTableId } };
        const options = { multi: true };

        const updateTeacher = await TimeTable.update(values, condition, options)

        return res.status(200).send({ status: 1010, msg: "The entered timeTable details has been updated Succesfully", upadtedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/ DELETE-A-TEACHER==========================================================//

const get = async function (req, res) {
    try {
        let data=req.query

        let findByFilter = await TimeTable.findAll({
            where: {
                [Op.or]: [{ className: { [Op.eq]: data.className } }, { day: { [Op.eq]: data.day } },
                { subjectName: { [Op.eq]: data.subjectName } }, { teacherName: { [Op.eq]: data.teacherName } }],
            },
        })

        if (!findByFilter) {
            return res.status(404).send({ status: 1008, msg: "No such Data found" })
        }

        return res.status(200).send({ status: 1010, message: 'Timetable for the given the parameters:', data: findByFilter })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}
//========================================DELETE/ DELETE-A-TEACHER==========================================================//

const destroy = async function (req, res) {
    try {

        let timeTableId = req.params.id

        let checkTimetable = await TimeTable.findOne({ where: { id: timeTableId } });

        if (!checkTimetable) {
            return res.status(422).send({ status: 1011, message: "Timetable is Already Deleted" })
        }

        let deleteTimetable = await TimeTable.destroy({ where: { id: timeTableId } })

        return res.status(200).send({ status: 1010, message: 'Timetable has been deleted Successfully', data: deleteTimetable.values })
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
    get,
    destroy
}