const express = require("express")
const dotenv = require('dotenv').config()
const teacherRouter = require('./routes/admin/teachers')
const classesRouter = require("./routes/admin/classes")
const subjectRouter = require("./routes/admin/subjects")
const studentRouter = require("./routes/students/students")
const app = express()


app.use(express.json())

const port = process.env.PORT

//Load Routes
app.use("/", teacherRouter, classesRouter, subjectRouter, studentRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})