import {Router} from "express";
import {
    addFavFood,
    addFavProgram,
    banUser,
    createUser,
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
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

router.post("/favProgram", addFavProgram);

router.delete("/favProgram", removeFavProgram);

router.get("/favProgram", getFavPrograms);

router.post("/favFood", addFavFood);

router.delete("/favFood", removeFavFood);

router.get("/favFood", getFavFoods);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
router.post("/api/therapist", async (req, res) => {
    const {userMessage} = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "You are a kind and helpful therapist."},
                    {role: "user", content: userMessage},
                ],
                temperature: 0.7,
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const therapistResponse = response.data.choices[0];
        res.json(therapistResponse.message.content);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({error: "Error communicating with OpenAI"});
    }
});

export default router;
