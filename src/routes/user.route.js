import { Router } from "express";
import FirebaseVerification from "../middlewares/Auth.js";
import { AuthFirebaseUser } from "../controllers/auth/Auth.controller.js";

const router = Router();

router.route("/auth").post(FirebaseVerification,AuthFirebaseUser)

export default router;
