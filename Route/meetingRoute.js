import {Router} from "express";
import {createMeeting, getMeetings} from "../Controller/meetingController.js";

const router = new Router();

//route used to create meetings
router.post("/", createMeeting);

//route used to get meetings for each user
router.get("/", getMeetings);

export default router;
