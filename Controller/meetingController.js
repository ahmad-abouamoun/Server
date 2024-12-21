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
        const decode = jwt.verify(token, secretKey);
        const meeting = await new Meeting({
            title,
            startDate,
            endDate,
            expert,
            user_id: decode.id,
        });
        await meeting.save();
        return res.status(200).json({message: meeting});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const getMeetings = async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
    const decode = jwt.verify(token, secretKey);
    if (decode.type === "user") {
        const meetings = await Meeting.find({user_id: decode.id});
        res.status(200).json({message: meetings});
    } else {
        const meetings = await Meeting.find({expert: decode.type});

        res.status(200).json({message: meetings});
    }
    res.status(200).json({message: token});
};
