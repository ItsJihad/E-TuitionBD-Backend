import { Router } from "express";
import { LatesApplications } from "../../controllers/openAPIs/Post-Applications/applications.OpenAPI.js";

 const router=Router()
router.route("/all").get(LatesApplications)

export default router