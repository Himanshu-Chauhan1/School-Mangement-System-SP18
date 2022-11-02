const express = require("express")
const classesRouter = express.Router()
const validate = require("../../validators/admin/classes")
const { create, get, update, destroy} = require("../../controllers/admin/classes")

classesRouter.post('/classes', [validate.create], create);
classesRouter.get('/classes', get);
classesRouter.put('/classes/:id',[validate.update], update);
classesRouter.delete('/classes/:id', [validate.destroy], destroy);


module.exports = classesRouter