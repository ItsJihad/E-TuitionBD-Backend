import { Router } from "express";
import { StudentPosts } from "../controllers/userCRUD/student/User.Post.js";
import { upload } from "../middlewares/multer.js";
import DeletePost from "../controllers/userCRUD/student/User.Delete.js";
import GetPostDetails from "../controllers/userCRUD/student/User.Get.js";
import UpdatePost from "../controllers/userCRUD/student/user.Patch.js";

const router = Router();

router.route("/post").post(upload.none(), StudentPosts);
router.route("/delete/:postId").delete(DeletePost)
router.route("/posts/:postId").get(GetPostDetails)
router.route("/update/:postId").patch(UpdatePost)
export default router;
