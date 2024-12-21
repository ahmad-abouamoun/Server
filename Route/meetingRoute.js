import {Router} from "express";
import {createMeeting} from "../Controller/meetingController.js";

const router = new Router();

router.post("/", createMeeting);

export default router;
