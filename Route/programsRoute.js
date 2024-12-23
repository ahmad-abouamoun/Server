import {Router} from "express";
import {createProgram} from "../Controller/programsController.js";
import multer from "multer";
import multer from "multer";
//
const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/programsImages");
    },
    filename: (req, file, cb) => {
        const name = req.body.name;
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${name}.${fileExtension}`);
    },
});
const upload = multer({storage});

router.post("/", upload.single("file"), createProgram);
export default router;
