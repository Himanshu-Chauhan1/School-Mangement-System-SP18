const express = require("express")
const teacherRouter = express.Router()
const validate = require("../../validators/admin/teachers")
const { create, update, destroy, index } = require("../../controllers/admin/teachers")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

teacherRouter.post('/teachers', [authentication,authorization, validate.create], create);
teacherRouter.get('/teachers', index);
teacherRouter.put('/teachers/:id', [authentication, authorization, validate.update], update);
teacherRouter.delete('/teachers/:id', [authentication, authorization, validate.destroy], destroy);

module.exports = teacherRouter