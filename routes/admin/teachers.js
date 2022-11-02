const express = require("express")
const teacherRouter = express.Router()
const validate = require("../../validators/admin/teachers")
const { create, update, destroy, index } = require("../../controllers/admin/teachers")

teacherRouter.post('/teachers', [validate.create], create);
teacherRouter.get('/teachers', index);
teacherRouter.put('/teachers/:id', [validate.update], update);
teacherRouter.delete('/teachers/:id', [validate.destroy], destroy);

module.exports = teacherRouter