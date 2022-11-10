const express = require("express")
const timeTableRouter = express.Router()
const validate = require("../../validators/admin/timeTable")
const { create, index, update, destroy } = require("../../controllers/admin/timeTables")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

timeTableRouter.post('/timetables-class', [validate.create], create);
timeTableRouter.get('/timetables-class', index);
timeTableRouter.put('/timetables-class/:id', [validate.update], update);
timeTableRouter.delete('/timetables-class/:id', [validate.destroy], destroy);

module.exports = timeTableRouter