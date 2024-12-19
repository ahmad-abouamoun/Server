import {Router} from "express";
import {createUser, getExperts, getUsers, Signin} from "../Controller/userController.js";
import multer from "multer";

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
const upload = multer({storage});

router.get("/", getUsers);
router.get("/experts", getExperts);

router.post("/signin", Signin);
router.post("/", upload.single("file"), createUser);

export default router;
