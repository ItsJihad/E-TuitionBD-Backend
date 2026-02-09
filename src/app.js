import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
import studentRouter from "../src/routes/student.route.js";
import teacherRouter from "../src/routes/teacher.route.js";
import allOpenStudents from "./controllers/openAPIs/User/students.OpenAPI.js";
import { allTeachers } from "./controllers/openAPIs/User/teachers.OpenAPI.js";
import allLatestPosts from "../src/routes/openRoutes/latestPosts.Open.route.js";
import alllatesapplications from "./routes/openRoutes/latestApplications.Open.route.js";
import teacherRoute from "../src/routes/teacher.route.js"
//____POST____
// app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher/applications", teacherRouter);
app.use("/api/user/auth",userRouter)
//_____GET_____
app.use("/api/allusers", allOpenStudents);
app.use("/api/allteachers", allTeachers);
app.use("/api/tuition", studentRouter);
app.use("/api/latestposts", allLatestPosts);
app.use("/api/allapplications", alllatesapplications);
app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRoute)
//__DELETE__
app.use("/api/student/post", studentRouter);
app.use("/api/teacher/application", teacherRouter);

//___PATCH___
app.use("/api/student/post", studentRouter);


//____ERRORHANDLE____
import errorHandler from "./utils/errorHandles.js";
app.use(errorHandler);


export { app };
