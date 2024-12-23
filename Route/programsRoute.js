import {Router} from "express";
import {createProgram} from "../Controller/programsController.js";

const router = new Router();
router.post("/", createProgram);
export default router;
