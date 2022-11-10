const express = require("express")
const classesRouter = express.Router()
const validate = require("../../validators/admin/classes")
const { create, index, update, destroy } = require("../../controllers/admin/classes")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

classesRouter.post('/classes', [validate.create], create);
classesRouter.get('/classes', index);
classesRouter.put('/classes/:id', [authentication, authorization, validate.update], update);
classesRouter.delete('/classes/:id', [authentication, authorization, validate.destroy], destroy);


module.exports = classesRouter