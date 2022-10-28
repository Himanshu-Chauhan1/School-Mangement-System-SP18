const express = require("express")
const subjectRouter = express.Router()
const { createSubjectValidation, deleteSubjectValidation, updateSubjectValidation } = require("../../validators/admin/subjects")
const { create, getAllSubjects, updateSubjectById, deleteSubjectById } = require("../../controllers/admin/subjects")

subjectRouter.post('/createSubject', [createSubjectValidation], create);
subjectRouter.get('/getAllSubjects', getAllSubjects);
subjectRouter.put('/updateSubject/:id',[updateSubjectValidation], updateSubjectById);
subjectRouter.delete('/deleteSubject/:id', [deleteSubjectValidation], deleteSubjectById);


module.exports = subjectRouter