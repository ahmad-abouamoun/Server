import {Router} from "express";
import {createMeeting} from "../Controller/meetingController.js";

const router = new Router();

//route used to create meetings
router.post("/", createMeeting);

export default router;
