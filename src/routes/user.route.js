import { Router } from "express";
import FirebaseVerification from "../middlewares/Auth.js";
import { AuthFirebaseUser, GoogleAuth } from "../controllers/auth/Auth.controller.js";

const router = Router();

router.route("/auth").post(FirebaseVerification,AuthFirebaseUser)
router.route("/googleauth").post(FirebaseVerification,GoogleAuth)

export default router;
