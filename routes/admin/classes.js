const express = require("express")
const classesRouter = express.Router()
const { createClassValidation } = require("../../validators/admin/classes")
const { create } = require("../../controllers/admin/classes")

classesRouter.post('/createClass', [createClassValidation], create);



module.exports=classesRouter