import {Router} from "express";
import {therapistAi} from "../Controller/apiController.js";
const router = new Router();
router.post("/therapist", therapistAi);

export default router;
