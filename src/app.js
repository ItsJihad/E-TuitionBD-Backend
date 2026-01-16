import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin:process.env.Cors_Origin,
    credentials:true
    // here we defined  frontend website's link, so that none of others can communicate to server
}));

app.use(express.json({limit:'16kb'}))
// here we've set a limit of having json data
app.use(express.urlencoded({extended:true,limit:'16kb'}))
// here we have set limit for having data from URL
app.use(express.static("public"))
// and this one is to store uploads from the user in to the specific folder

// ROUTERS____________________
import userRouter from "../src/routes/user.route.js"

app.use("/user",userRouter)





export { app };
