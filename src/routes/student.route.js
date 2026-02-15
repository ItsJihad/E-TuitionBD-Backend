import { Router } from "express";
import { StudentPosts } from "../controllers/userCRUD/student/User.Post.js";
import DeletePost from "../controllers/userCRUD/student/User.Delete.js";
import GetPostDetails from "../controllers/userCRUD/student/User.Get.js";
import UpdatePost from "../controllers/userCRUD/student/user.Patch.js";
import FirebaseVerification from "../middlewares/Auth.js";
import GetAllPostByUser from "../controllers/userCRUD/student/User.all.Posts.js";
import { ApproveApplications } from "../controllers/userCRUD/student/Approve.application.js";

const router = Router();

router.route("/post").post(FirebaseVerification,StudentPosts);
router.route("/delete/:postId").delete(FirebaseVerification,DeletePost)
router.route("/posts/:postId").get(FirebaseVerification,GetPostDetails)
router.route("/update/:postId").patch(FirebaseVerification,UpdatePost)
router.route("/alluserposts").get(FirebaseVerification,GetAllPostByUser)
router.route("/approveapplication/:applicationid").patch(FirebaseVerification,ApproveApplications)

export default router;
