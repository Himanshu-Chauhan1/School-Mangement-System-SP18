const express = require("express")
const subjectRouter = express.Router()
const validate = require("../../validators/admin/subjects")
const { create, index, update, destroy } = require("../../controllers/admin/subjects")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

subjectRouter.post('/subjects', [validate.create], create);
subjectRouter.get('/subjects', index);
subjectRouter.put('/subjects/:id', [authentication, authorization, validate.update], update);
subjectRouter.delete('/subjects/:id', [authentication, authorization, validate.destroy], destroy);


module.exports = subjectRouter