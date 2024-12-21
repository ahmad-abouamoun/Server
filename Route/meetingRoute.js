import {Router} from "express";
import {createMeeting, getMeetings} from "../Controller/meetingController.js";

const router = new Router();

//route used to create meetings
router.post("/", createMeeting);

router.get("/", getMeetings);

export default router;
