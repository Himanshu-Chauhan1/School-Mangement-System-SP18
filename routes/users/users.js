const express = require("express")
const userRouter = express.Router()
const validate = require("../../validators/users/users")
const { create, update, destroy, login, index } = require("../../controllers/user/users");


userRouter.post('/users/students', [validate.createStudent], create);
userRouter.post('/users/admins', [validate.createAdmin], create);
userRouter.post('/users/teachers', [validate.createTeacher], create);
userRouter.put('/users/students/:id', [validate.updateStudent], update);
userRouter.put('/users/admins/:id', [validate.updateAdmin], update);
userRouter.put('/users/teachers/:id', [validate.updateTeacher], update);
userRouter.put('/users/teachers/:id', [validate.updateTeacher], update);
userRouter.get('/users', index);
userRouter.delete('/users/admins/:id', [validate.deleteAdmin], destroy);
userRouter.delete('/users/teachers/:id', [validate.deleteTeacher], destroy);
userRouter.post('/users/login', [validate.login], login);

module.exports = userRouter