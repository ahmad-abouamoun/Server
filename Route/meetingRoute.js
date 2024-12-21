import {Router} from "express";

const router = new Router();

router.post("/", createMeeting);

export default router;
