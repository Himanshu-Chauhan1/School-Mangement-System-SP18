const express = require("express")
const admissionRouter = express.Router()
const validate = require("../../validators/admin/admissions")
const { create, index, update, destroy } = require("../../controllers/admin/admissions")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

admissionRouter.post('/admissions', [authentication,authorization,validate.create], create);
admissionRouter.get('/admissions', [authentication, authorization], index);
admissionRouter.put('/admissions/:id', [authentication, authorization, validate.update], update);
admissionRouter.delete('/admissions/:id', [authentication, authorization,validate.destroy], destroy);


module.exports = admissionRouter