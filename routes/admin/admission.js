const express = require("express")
const admissionRouter = express.Router()
const validate = require("../../validators/admin/admissions")
const { create, get, update, destroy } = require("../../controllers/admin/admissions")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

admissionRouter.post('/admissions', [authentication, validate.create], create);
admissionRouter.get('/admissions', get);
admissionRouter.put('/admissions/:id', update);
admissionRouter.delete('/admissions/:id', destroy);


module.exports = admissionRouter