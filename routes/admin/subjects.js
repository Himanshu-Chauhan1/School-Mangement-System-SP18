const express = require("express")
const subjectRouter = express.Router()
const validate= require("../../validators/admin/subjects")
const { create, get, update, destroy } = require("../../controllers/admin/subjects")

subjectRouter.post('/subjects', [validate.create], create);
subjectRouter.get('/subjects', get);
subjectRouter.put('/subjects/:id', [validate.update], update);
subjectRouter.delete('/subjects/:id', [validate.destroy], destroy);


module.exports = subjectRouter