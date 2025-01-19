import jwt from "jsonwebtoken";
import {secretKey} from "../Controller/userController.js";

export const adminMiddleWare = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
    try {
        const decode = jwt.verify(token, secretKey);
        if (decode.type === "admin") {
            next();
        } else {
            return res.status(400).json({message: "unAutharized"});
        }
    } catch (error) {
        return res.status(400).json({message: "Invalid token this is in the catch", error});
    }
};
