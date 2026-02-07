import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.Cors_Origin,
    credentials: true,
    // here we defined  frontend website's link, so that none of others can communicate to server
  }),
);
app.use(cookieParser());
// here its being used to save or remove tokens from cookies
app.use(express.json({ limit: "16kb" }));
// here we've set a limit of having json data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// here we have set limit for having data from URL
app.use(express.static("public"));
// and this one is to store uploads from the user in to the specific folder

// ROUTERS____________________
import userRouter from "../src/routes/user.route.js";
import studentRouter from "../src/routes/student.route.js"
import teacherRouter from "../src/routes/teacher.route.js"
import allOpenStudents from "./controllers/openAPIs/students.OpenAPI.js";
import {allTeachers }from "./controllers/openAPIs/teachers.OpenAPI.js";


//____POST____
app.use("/user", userRouter);
app.use("/student",studentRouter)
app.use("/teacher",teacherRouter)
//_____GET_____
app.use("/allusers",allOpenStudents)
app.use("/allteachers",allTeachers)

app.use("/tuition",studentRouter)
//__DELETE__
app.use("/student/post",studentRouter)

//___PATCH___
app.use("/student",studentRouter)
export { app };
