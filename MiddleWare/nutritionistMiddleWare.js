import jwt from "jsonwebtoken";
import {secretKey} from "../Controller/userController.js";

export const nutritionistMiddleWare = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }

    const decode = jwt.verify(token, secretKey);
    if (decode.type === "nutritionist") {
        next();
    } else {
        return res.status(400).json({message: "unAutharized"});
    }
};
