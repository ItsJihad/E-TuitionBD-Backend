import { Router } from "express";
import { StudentPosts } from "../controllers/User.Post.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route("/post").post(upload.none(), StudentPosts);

export default router;
