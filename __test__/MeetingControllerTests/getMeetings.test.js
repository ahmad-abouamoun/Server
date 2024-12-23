import jwt from "jsonwebtoken";
import {getMeetings} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";
jest.mock("../../Models/meeting.js");
