import {Router} from "express";
import {createFood, getFoods} from "../Controller/foodController.js";
import multer from "multer";

const router = new Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/foodImages");
    },
    filename: (req, file, cb) => {
        const name = req.body.name;
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${name}.${fileExtension}`);
    },
});
const upload = multer({storage});

router.post("/", upload.single("file"), createFood);
router.get("/", getFoods);

export default router;
