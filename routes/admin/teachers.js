const express = require("express")
const teacherRouter = express.Router()
const { createTeacherValidation } = require("../../validators/admin/teachers")
const { create } = require("../../controllers/admin/teachers")

teacherRouter.post('/createTeacher', [createTeacherValidation], create);

module.exports = teacherRouter