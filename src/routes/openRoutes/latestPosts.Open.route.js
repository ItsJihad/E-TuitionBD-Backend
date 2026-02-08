import { Router } from "express";
import { AllPostsByUsers } from "../../controllers/openAPIs/Post-Applications/posts.OpenAPI.js";

const router = Router();
router.route("/all").get(AllPostsByUsers);

export default router;
