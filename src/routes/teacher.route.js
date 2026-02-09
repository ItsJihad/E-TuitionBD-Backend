import { Router } from "express";
import TeachingApplication from "../controllers/userCRUD/teacher/User.post.js";
import DeleteApplication from "../controllers/userCRUD/teacher/User.delete.js";
import FirebaseVerification from "../middlewares/Auth.js";
import GetAllApplicationsByUser from "../controllers/userCRUD/teacher/User.all.applications.js";

const router = Router();

router.route("/apply/:postId").post(FirebaseVerification,TeachingApplication);
router.route("/delete/:appID").delete(FirebaseVerification,DeleteApplication)
router.route("/allapplications").get(FirebaseVerification, GetAllApplicationsByUser)
export default router;
