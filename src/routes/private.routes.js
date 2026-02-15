import { Router } from "express";
import { AllPrivateTeachers } from "../controllers/PrivateApis/AllPrivateTeachers.Api.js";
import FirebaseVerification from "../middlewares/Auth.js";
import { AllPrivateTuitionPosts } from "../controllers/PrivateApis/AllPrivateTuitionPosts.Api.js";
import { GetUserRole } from "../controllers/auth/User.role.controller.js";
const router=Router()
router.route("/allprivateteachers").get(FirebaseVerification, AllPrivateTeachers)
router.route("/allprivateposts").get(FirebaseVerification, AllPrivateTuitionPosts)
router.route("/userrole").get(FirebaseVerification, GetUserRole)
export default router