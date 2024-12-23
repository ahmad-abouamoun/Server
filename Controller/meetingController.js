import jwt from "jsonwebtoken";
import {secretKey} from "./userController.js";
import {Meeting} from "../Models/meeting.js";

//used to create meetings for users
export const createMeeting = async (req, res) => {
    const {token, title, startDate, endDate, expert} = req.body;
    if (!token || !title || !startDate || !endDate || !expert) {
        return res.status(400).json({message: "all fields should be provided"});
    }
    try {
        const checkTime = Meeting.findOne({startDate, endDate, expert});
        if (checkTime) {
            return res.status(400).json({message: "slot already been taken"});
        }
        const decode = jwt.verify(token, secretKey);
        const meeting = new Meeting({
            title,
            startDate,
            endDate,
            expert,
            user_id: decode.id,
        });
        await meeting.save();
        return res.status(200).json(meeting);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//used to get meetings that are related to the user depending on the type
export const getMeetings = async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
    try {
        const decode = jwt.verify(token, secretKey);
        if (decode.type === "user") {
            const meetings = await Meeting.find({user_id: decode.id});
            return res.status(200).json({message: meetings});
        } else {
            const meetings = await Meeting.find({expert: decode.type});

            return res.status(200).json(meetings);
        }
    } catch (error) {
        res.status(400).json({message: "an error has occured"});
    }
};
