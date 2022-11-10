const express = require("express")
const timeTableRouter = express.Router()
const validate = require("../../validators/admin/timeTable")
const { create, index, update, get, destroy } = require("../../controllers/admin/timeTables")
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")

timeTableRouter.post('/timetables/class', [authentication,authorization,validate.create], create);
timeTableRouter.get('/timetables/class', index);
timeTableRouter.get('/timetables/byfilters', [authentication,authorization,validate.get], get);
timeTableRouter.put('/timetables/class/:id', [authentication,authorization,validate.update], update);
timeTableRouter.delete('/timetables/class/:id', [authentication,authorization,validate.destroy], destroy);

module.exports = timeTableRouter