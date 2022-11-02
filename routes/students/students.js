const express = require("express")
const studentRouter = express.Router()
const validate = require("../../validators/students/students")
const { create, get, update, destroy} = require("../../controllers/students/admissions")

studentRouter.post('/students', create);
studentRouter.get('/students', get);
studentRouter.put('/students/:id',update);
studentRouter.delete('/students/:id', destroy);



module.exports=studentRouter