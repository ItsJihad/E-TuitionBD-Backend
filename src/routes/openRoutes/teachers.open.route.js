import { Router } from "express";
import {allTeachers} from "../../controllers/openAPIs/teachers.OpenAPI";

const router = Router()
    router.route("/allteachers").get(allTeachers)


    export default router