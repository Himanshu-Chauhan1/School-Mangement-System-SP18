const express = require("express")
const subjectRouter = express.Router()
const { createSubjectValidation } = require("../../validators/admin/subjects")
const { create } = require("../../controllers/admin/subjects")

subjectRouter.post('/createSubject', [createSubjectValidation], create);



module.exports=subjectRouter