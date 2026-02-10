import { Router } from "express";
import FirebaseVerification from "../middlewares/Auth.js";
import { AccessLevelChecker } from "../middlewares/AccessLevel.js";
import { AdminCreatesUser } from "../controllers/ADMIN/AdminCRUD/create.user.js";
import { AdminGetsUser } from "../controllers/ADMIN/AdminCRUD/get.Users.js";
import { AdminDeletesUser } from "../controllers/ADMIN/AdminCRUD/delete.user.js";
import { AdminUpdatesUser } from "../controllers/ADMIN/AdminCRUD/update.user.js";

const router =Router()
router.route("/createuser").post(FirebaseVerification,AccessLevelChecker,AdminCreatesUser)
router.route("/userdetails/:userId").get(FirebaseVerification,AccessLevelChecker,AdminGetsUser)
router.route("/deleteuser/:userId").delete(FirebaseVerification,AccessLevelChecker,AdminDeletesUser)
router.route("/updateuser/:userId").patch(FirebaseVerification,AccessLevelChecker,AdminUpdatesUser)

export default router