const db = require("../../models");
const { Op } = require("sequelize")
const { TimeTable, Subject, Class, Teacher } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR DAY- ///////////////////////
const isValidDay = (day) => {
    return /^(monday|tuesday|wednesday|thursday|friday|saturday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)$/.test(day);
};

//////////////// -FOR START TIME- ///////////////////////
const isValidStartTime = (startTime) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g.test(startTime);
};

//////////////// -FOR END TIME- ///////////////////////
const isValidEndTime = (endTime) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g.test(endTime);
};

//////////////// -FOR SUBJECTNAME- ///////////////////////
const isValidSubjectName = (subjectName) => {
    return /^[a-zA-Z ]+$/.test(subjectName);
};

//////////////// -FOR TEACHERNAME- ///////////////////////
const isValidTeacherName = (teacherName) => {
    return /^[a-zA-Z ]+$/.test(teacherName);
};

//////////////// -FOR CLASS SHIFT- ///////////////////////
const isValidClassShift = (classShift) => {
    return /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)$/gm.test(classShift)
};


//========================================CREATE-A-CLASSTIMETABLE==========================================================//

const create = async function (req, res, next) {
    try {
        const data = req.body

        const { className, day, classShift, startTime, endTime, subjectName, teacherName } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(className)) {
            return res.status(422).send({ status: 1002, message: "ClassName is required" })
        }

        const isRegisteredClassName = await Class.findOne({ where: { className: className } });

        if (!isRegisteredClassName) {
            return res.status(422).send({ status: 1008, message: "Class is not registered" })
        }

        if (!isValid(day)) {
            return res.status(422).send({ status: 1002, message: "Day is required like monday, tuesday etc" })
        }

        if (!isValidDay(day)) {
            return res.status(422).send({ status: 1002, message: "You can only provide days from Monday to Saturday" })
        }

        if (!isValid(classShift)) {
            return res.status(422).send({ status: 1002, message: "ClassShift is required" })
        }

        const isRegisteredClassShift = await Class.findOne({ where: { classShift: classShift } });

        if (!isRegisteredClassShift) {
            return res.status(422).send({ status: 1008, message: "This classshift is not registered, please enter a registered one" })
        }

        if (!isValid(startTime)) {
            return res.status(422).send({ status: 1002, message: "startTime is not required" })
        }

        if (!isValidStartTime(startTime)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid startTime in 24hrs format like 10:00" })
        }

        let sTime = startTime
        let newStartTime = (Number(sTime.split(':')[0]) * 60 * 60 * 1000 + Number(sTime.split(':')[1]) * 60 * 1000).toString()

        data.startTime = newStartTime

        let oneHoursTime = 3600000

        let time = newStartTime / oneHoursTime

        console.log(time);

        if (!isValid(endTime)) {
            return res.status(422).send({ status: 1002, message: "endTime is required" })
        }

        let eTime = endTime
        let newEndTime = (Number(eTime.split(':')[0]) * 60 * 60 * 1000 + Number(eTime.split(':')[1]) * 60 * 1000).toString()

        if (!isValidEndTime(endTime)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid startTime in 24hrs format like 10:00" })
        }


        data.endTime = newEndTime

        let matchTimeSlot = await TimeTable.findOne({
            where: {
                [Op.and]: [{
                    startTime: {
                        [Op.lt]: newEndTime,
                    }
                },
                {
                    endTime: {
                        [Op.gt]: newStartTime,
                    }
                },

                ]
            }
        })

        if (!matchTimeSlot) {
            return res.status(422).send({ status: 1003, message: "On this time slot there is already one Period please choose a another time slot or time" })
        }

        if (!isValid(subjectName)) {
            return res.status(422).send({ status: 1002, message: "subjectName is required" })
        }

        if (!isValidSubjectName(teacherName)) {
            return res.status(422).send({ status: 1003, message: "subjectName is not valid please enter name in alphabets only" })
        }

        const isRegisteredSubjectName = await Subject.findOne({ where: { subjectName: subjectName } });

        if (!isRegisteredSubjectName) {
            return res.status(422).send({ status: 1008, message: "This subjectName is not registered please enter a registered One" })
        }

        if (!isValid(teacherName)) {
            return res.status(422).send({ status: 1002, message: "teacher is required" })
        }

        if (!isValidTeacherName(teacherName)) {
            return res.status(422).send({ status: 1003, message: "TeacherName is not valid please enter name in alphabets only" })
        }

        const isRegisteredTeacherName = await Teacher.findOne({ where: { fullName: teacherName } });

        if (!isRegisteredTeacherName) {
            return res.status(422).send({ status: 1008, message: "This Teacher is not registered please enter a registered one" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================UPDATE-A-CLASSTIMETABLE==========================================================//

const update = async function (req, res, next) {
    try {

        const timeTableId = req.params.id;

        if (!isValid(timeTableId)) {
            return res.status(422).send({ status: 1003, message: "TimeTable-Id is not valid" })
        }

        const enteredClass = await Class.findByPk(timeTableId)

        if (!enteredClass) {
            return res.status(422).send({ status: 1006, message: "Provided Timetable-ID does not exists" })
        }

        const data = req.body

        const { className, day, classShift, startTime, endTime, subjectName, teacherName } = data

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("className" in data) {
            if (!isValid(className)) {
                return res.status(422).send({ status: 1002, message: "className is required" })
            }

            const isSameClassName = await TimeTable.findOne({ where: { className: className } });

            if (isSameClassName) {
                return res.status(422).send({ status: 1008, message: "classname is same please enter a new one to update" })
            }

            const isRegisteredClassName = await Class.findOne({ where: { className: className } });

            if (!isRegisteredClassName) {
                return res.status(422).send({ status: 1008, message: "ClassName is not a registered classname or Invalid ClassName" })
            }

            dataObject['className'] = className
        }

        if ("day" in data) {

            if (!isValid(day)) {
                return res.status(422).send({ status: 1002, message: "Day is required like monday, tuesday etc" })
            }

            if (!isValidDay(day)) {
                return res.status(422).send({ status: 1002, message: "You can only provide days from Monday to Saturday" })
            }

            const isRegisteredDayName = await TimeTable.findOne({ where: { day: day } });

            if (isRegisteredDayName) {
                return res.status(422).send({ status: 1008, message: "Entered day is same please enter a new one to update" })
            }

            dataObject['day'] = day
        }

        if ("classShift" in data) {

            if (!isValid(classShift)) {
                return res.status(422).send({ status: 1002, message: "Class Shift is required" })
            }

            if (!isValidClassShift(classShift)) {
                return res.status(422).send({ status: 1003, message: "Please enter class shift in a format of like 9am-5pm" })
            }

            const isSameClassShift = await TimeTable.findOne({ where: { classShift: classShift } });

            if (isSameClassShift) {
                return res.status(422).send({ status: 1008, message: "Entered classShift is same please enter a new one to update" })
            }

            const isRegisteredClassShift = await Class.findOne({ where: { classShift: classShift } });

            if (!isRegisteredClassShift) {
                return res.status(422).send({ status: 1008, message: "Invalid Classhift or classshift is not registered" })
            }

            dataObject['classShift'] = classShift
        }

        if ("startTime" in data) {

            if (!isValid(startTime)) {
                return res.status(422).send({ status: 1002, message: "startTime is not required" })
            }

            if (!isValidStartTime(startTime)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid startTime in 24hrs format like 10:00" })
            }

            let sTime = startTime
            let newStartTime = (Number(sTime.split(':')[0]) * 60 * 60 * 1000 + Number(sTime.split(':')[1]) * 60 * 1000).toString()

            data.startTime = newStartTime

            dataObject['startTime'] = newStartTime
        }

        if ("endTime" in data) {

            if (!isValid(endTime)) {
                return res.status(422).send({ status: 1002, message: "endTime is required" })
            }

            if (!isValidEndTime(endTime)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid endTime in 24hrs format like 10:00" })
            }

            let eTime = endTime
            let newEndTime = (Number(eTime.split(':')[0]) * 60 * 60 * 1000 + Number(eTime.split(':')[1]) * 60 * 1000).toString()


            data.startTime = newEndTime

            dataObject['endTime'] = newEndTime
        }

        if ("startTime", "endTime" in data) {

            let sTime = startTime
            let newStartTime = (Number(sTime.split(':')[0]) * 60 * 60 * 1000 + Number(sTime.split(':')[1]) * 60 * 1000).toString()
            data.startTime = newStartTime

            let eTime = endTime
            let newEndTime = (Number(eTime.split(':')[0]) * 60 * 60 * 1000 + Number(eTime.split(':')[1]) * 60 * 1000).toString()
            data.endTime = newEndTime


            let matchTimeSlot = await TimeTable.findOne({
                where: {
                    [Op.and]: [{
                        startTime: {
                            [Op.lt]: newEndTime,
                        }
                    },
                    {
                        endTime: {
                            [Op.gt]: newStartTime,
                        }
                    },

                    ]
                }
            })

            if (!matchTimeSlot) {
                return res.status(422).send({ status: 1003, message: "On this time slot there is already one Period please choose a another time slot or time" })
            }

        }

        if ("subjectName" in data) {

            if (!isValid(subjectName)) {
                return res.status(422).send({ status: 1002, message: "SubjectName is required" })
            }

            if (!isValidSubjectName(subjectName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid subject name" })
            }

            const isSameSubjectName = await TimeTable.findOne({ where: { subjectName: subjectName } });

            if (isSameSubjectName) {
                return res.status(422).send({ status: 1008, message: "subjectName is same please enter a new one to update" })
            }

            const isRegisteredSubjectName = await Subject.findOne({ where: { subjectName: subjectName } });

            if (!isRegisteredSubjectName) {
                return res.status(422).send({ status: 1008, message: "Invalid Subject or Subject is not registered" })
            }

            dataObject['subjectName'] = subjectName
        }

        if ("teacherName" in data) {

            if (!isValid(teacherName)) {
                return res.status(422).send({ status: 1002, message: "teacherName is required" })
            }

            if (!isValidSubjectName(teacherName)) {
                return res.status(422).send({ status: 1003, message: "Please enter a valid teacherName" })
            }

            const isSameTeacherName = await TimeTable.findOne({ where: { teacherName: teacherName } });

            if (isSameTeacherName) {
                return res.status(422).send({ status: 1008, message: "teacherName is same please enter a new one to update" })
            }

            const isRegisteredTeacherName = await Teacher.findOne({ where: { fullName: teacherName } });

            if (!isRegisteredTeacherName) {
                return res.status(422).send({ status: 1008, message: "Invalid Teacher or Teacher is not registered" })
            }

            dataObject['teacherName'] = teacherName
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================DELETE-A-CLASSTIMETABLE==========================================================//

const destroy = async function (req, res, next) {
    try {

        let timeTableId = req.params.id

        if (!timeTableId) {
            return res.status(422).send({ status: 1002, message: "Please enter a timetable-Id" })
        }
        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    create,
    update,
    destroy
}







