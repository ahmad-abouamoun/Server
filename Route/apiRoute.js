import {Router} from "express";
import {modelHandler, therapistAi} from "../Controller/apiController.js";
const router = new Router();
router.post("/therapist", therapistAi);
router.post("/model", modelHandler);

export default router;
