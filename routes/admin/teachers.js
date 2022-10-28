const express = require("express")
const teacherRouter = express.Router()
const { createTeacherValidation, deleteTeacherValidation, updateTeacherValidation } = require("../../validators/admin/teachers")
const { create, getAllTeacher, deleteTeacherById, updateTeacherById } = require("../../controllers/admin/teachers")

teacherRouter.post('/createTeacher', [createTeacherValidation], create);
teacherRouter.get('/getAllTeacher', getAllTeacher);
teacherRouter.put('/updateTeacher/:id', [updateTeacherValidation], updateTeacherById);
teacherRouter.delete('/deleteTeacher/:id', [deleteTeacherValidation], deleteTeacherById);

module.exports = teacherRouter