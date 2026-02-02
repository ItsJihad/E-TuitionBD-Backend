import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import TeachingApplication from "../controllers/User.application.js";

const router = Router();

router.route("/apply/:postId").post(upload.none(), TeachingApplication);
export default router;
