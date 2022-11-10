const express = require("express")
const studentRouter = express.Router()
const validate = require("../../validators/students/students")
const { create, index, update, destroy } = require("../../controllers/students/students")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

studentRouter.post('/students', [authentication,authorization,validate.create], create);
studentRouter.get('/students/:id', index);
studentRouter.put('/students/:id', [authentication, authorization], update);
studentRouter.delete('/students/:id', [authentication, authorization], destroy);



module.exports = studentRouter