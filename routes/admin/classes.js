const express = require("express")
const classesRouter = express.Router()
const { createClassValidation, deleteClassValidation, updateClassValidation } = require("../../validators/admin/classes")
const { create, getAllClasses, updateClassById, deleteClassById } = require("../../controllers/admin/classes")

classesRouter.post('/createClass', [createClassValidation], create);
classesRouter.get('/getAllClasses', getAllClasses);
classesRouter.put('/updateClass/:id',[updateClassValidation], updateClassById);
classesRouter.delete('/deleteClass/:id', [deleteClassValidation], deleteClassById);


module.exports = classesRouter