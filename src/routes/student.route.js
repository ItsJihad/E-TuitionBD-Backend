import { Router } from "express";
import { StudentPosts } from "../controllers/userCRUD/student/User.Post.js";
import DeletePost from "../controllers/userCRUD/student/User.Delete.js";
import GetPostDetails from "../controllers/userCRUD/student/User.Get.js";
import UpdatePost from "../controllers/userCRUD/student/user.Patch.js";
import FirebaseVerification from "../middlewares/Auth.js";

const router = Router();

router.route("/post").post(FirebaseVerification,StudentPosts);
router.route("/delete/:postId").delete(FirebaseVerification,DeletePost)
router.route("/posts/:postId").get(FirebaseVerification,GetPostDetails)
router.route("/update/:postId").patch(FirebaseVerification,UpdatePost)

export default router;
