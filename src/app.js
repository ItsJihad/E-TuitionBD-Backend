import express from "express";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // here we defined  frontend website's link, so that none of others can communicate to server
  }),
);

app.use(express.json({ limit: "16kb" }));
// here we've set a limit of having json data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// here we have set limit for having data from URL
app.use(express.static("public"));
// and this one is to store uploads from the user in to the specific folder

 //____ERRORHANDLE____
    app.use(errorHandler);

// ___________________ROUTERS____________________
import userRouter from "../src/routes/user.route.js";
import studentRouter from "../src/routes/student.route.js";
import teacherRouter from "../src/routes/teacher.route.js";
import allOpenStudents from "./controllers/openAPIs/User/students.OpenAPI.js";
import { allTeachers } from "./controllers/openAPIs/User/teachers.OpenAPI.js";
import allLatestPosts from "../src/routes/openRoutes/latestPosts.Open.route.js";
import alllatesapplications from "./routes/openRoutes/latestApplications.Open.route.js";
import teacherRoute from "../src/routes/teacher.route.js";
import AdminRouter from "../src/routes/admin.route.js";
import {StripePayment} from "../src/middlewares/Stripe.Payment.js"
import PrivateRoutes from "../src/routes/private.routes.js"

//____Auth - POST____
app.use("/api/user", userRouter);


//______PRIVATE_ROUTES________

      app.use("/api/private",PrivateRoutes)



//_____PAYMENT______
      app.use("/api/payment",StripePayment)


//_____OPEN-API________

    //____GET____
      //   app.use("/api/allusers", allOpenStudents);
        app.use("/api/allteachers", allTeachers);
        app.use("/api/latestposts", allLatestPosts);
        app.use("/api/allapplications", alllatesapplications);


//_____TEACHER_______

      //___POST___
            app.use("/api/teacher/applications", teacherRouter);
      //____GET____
            app.use("/api/teacher", teacherRoute);

      //___DELETE___
            app.use("/api/teacher/application", teacherRouter);

      //____PATCH____
            //NO NEED FOR NOW


//________STUDENT_________

      //___POST___
            app.use("/api/student", studentRouter);
      //____GET____
            app.use("/api/tuition", studentRouter);
            app.use("/api/student", studentRouter);

      //___DELETE___
            app.use("/api/student/post", studentRouter);

      //____PATCH____
            app.use("/api/student/post", studentRouter);


//_________ADMIN__________

      //___POST___
            app.use("/api/admin", AdminRouter);

      //____GET____
            app.use("/api/admin", AdminRouter);

      //___DELETE___
            app.use("/api/admin", AdminRouter);

      //____PATCH____
            app.use("/api/admin", AdminRouter);



//_______________________________________________________________________________________


export { app };
