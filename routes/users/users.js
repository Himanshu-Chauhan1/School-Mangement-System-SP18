const express = require("express")
const userRouter = express.Router()
const validate = require("../../validators/users/users")
const { create, update, destroy, login, index } = require("../../controllers/user/users");
const { authentication } = require("../../middleware/authentication")
const { authorization } = require("../../middleware/authorization")


userRouter.post('/users/students', [validate.createStudent], create);
userRouter.post('/users/admins', [validate.createAdmin], create);
userRouter.post('/users/teachers', [validate.createTeacher], create);
userRouter.put('/users/students/:id', [authentication, authorization, authentication, authorization, validate.updateStudent], update);
userRouter.put('/users/admins/:id', [authentication, authorization, validate.updateAdmin], update);
userRouter.put('/users/teachers/:id', [authentication, authorization, validate.updateTeacher], update);
userRouter.put('/users/teachers/:id', [authentication, authorization, validate.updateTeacher], update);
userRouter.get('/users', [authentication, authorization], index);
userRouter.delete('/users/admins/:id', [authentication, authorization, validate.deleteAdmin], destroy);
userRouter.delete('/users/teachers/:id', [authentication, authorization, validate.deleteTeacher], destroy);
userRouter.post('/users/login', [validate.login], login);

module.exports = userRouter