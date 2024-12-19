import {Router} from "express";
import {banUser, createUser, getExperts, getUsers, Signin} from "../Controller/userController.js";
import multer from "multer";
import {adminMiddleWare} from "../MiddleWare/adminMiddleWare.js";

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
//gets users with type:users
router.get("/", getUsers);
//gets users with type:coach,or nutritionist, or therapist
router.get("/experts", getExperts);
//allows the user to sigin to the website
router.post("/signin", Signin);
//allows user to create an account
router.post("/", upload.single("file"), createUser);
//allows the admin to ban a user
router.put("/:id", adminMiddleWare, banUser);

export default router;
