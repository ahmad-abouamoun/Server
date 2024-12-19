import {Router} from "express";
import {createFood} from "../Controller/foodController";

const router = new Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/userImages");
    },
    filename: (req, file, cb) => {
        const email = req.body.email;
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${email}.${fileExtension}`);
    },
});

router.post("/", createFood);
