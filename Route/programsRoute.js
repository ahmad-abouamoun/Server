import {Router} from "express";
import {createProgram, getPrograms, updateProgram} from "../Controller/programsController.js";
import multer from "multer";

const router = new Router();

//used to save the files recieved into the images/programimages directory
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
//route that uses the multer library to recieve a file and invokes the create program api
router.post("/", upload.single("file"), createProgram);

//route that invokes the get programs api
router.get("/", getPrograms);

//route that invokes the update program api
router.patch("/:id", updateProgram);
export default router;
