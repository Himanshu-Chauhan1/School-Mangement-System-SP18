const express = require("express")
const userRouter = express.Router()
const validate = require("../validators/users")
const { create, login } = require("../controllers/user/users")

userRouter.post('/users/user-create', [validate.createStudent], create);
userRouter.post('/users/admin-create', [validate.createAdmin], create);
userRouter.post('/users/login', [validate.login], login);

module.exports = userRouter