import { Router } from "express";
import allOpenStudents from "../controllers/openAPIs/students.OpenAPI.js";


const router = Router()

router.route('/allusers').get(allOpenStudents)

export default router