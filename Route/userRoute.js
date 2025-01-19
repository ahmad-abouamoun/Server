import {Router} from "express";
import {
    addFavFood,
    addFavProgram,
    banUser,
    createUser,
    DeleteUser,
    getExperts,
    getFavFoods,
    getFavPrograms,
    getUser,
    getUsers,
    removeFavFood,
    removeFavProgram,
    Signin,
    updateUser,
} from "../Controller/userController.js";
import multer from "multer";
import {adminMiddleWare} from "../MiddleWare/adminMiddleWare.js";

const router = new Router();
//used to save the images of the users in the userImages folder which is inside the Images folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/userImages");
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${timestamp}.${fileExtension}`);
    },
});
const upload = multer({storage});
//gets data of a single user
router.get("/getUser", getUser);
//gets users with type:users
router.get("/", getUsers);

//gets users with type:coach,or nutritionist, or therapist
router.get("/experts", getExperts);

//allows the user to sigin to the website
router.post("/signin", Signin);

//allows user to create an account
router.post("/", upload.single("file"), createUser);

//allows only the admin to ban a user
router.put("/:id", adminMiddleWare, banUser);

//allows the user to update its data
router.patch("/", updateUser);

//allows the admin to delete expert
router.delete("/:id", adminMiddleWare, DeleteUser);

router.post("/favProgram", addFavProgram);

router.delete("/favProgram", removeFavProgram);

router.get("/favProgram", getFavPrograms);

router.post("/favFood", addFavFood);

router.delete("/favFood", removeFavFood);

router.get("/favFood", getFavFoods);

export default router;
