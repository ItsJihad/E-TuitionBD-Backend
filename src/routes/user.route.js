import { Router } from "express";
import RegisterUser from "../controllers/User.Register.js";
import LoginUser from "../controllers/User.Login.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  RegisterUser,
);
router.route("/login").post(upload.none(), LoginUser);

export default router;
