import {Router} from "express";
import {createFood, getFoods} from "../Controller/foodController.js";
import multer from "multer";
import {nutritionistMiddleWare} from "../MiddleWare/nutritionistMiddleWare.js";

const router = new Router();

//used to save the images of the foods in the foodImages folder which is inside the Images folder
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

//route for creating food
router.post("/", upload.single("filename"), createFood);

//route for getting all foods
router.get("/", getFoods);

export default router;
