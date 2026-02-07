import { Router } from "express";
import TeachingApplication from "../controllers/userCRUD/teacher/User.post.js";
import DeleteApplication from "../controllers/userCRUD/teacher/User.delete.js";

const router = Router();

router.route("/apply/:postId").post(TeachingApplication);
router.route("/delete/:appID").delete(DeleteApplication)
export default router;
