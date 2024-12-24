import jwt from "jsonwebtoken";
import {secretKey} from "../Controller/userController.js";

export const coachMiddleWare = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
};
