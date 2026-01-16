import { Router } from "express";
import RegisterUser from "../controllers/User.Register.js";
import LoginUser from "../controllers/User.Login.js";


const router = Router()


router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)


export default router