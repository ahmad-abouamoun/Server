import {Router} from "express";
import {createProgram, getPrograms, updateProgram} from "../Controller/programsController.js";
import multer from "multer";
import {coachMiddleWare} from "../MiddleWare/coachMiddleWare.js";

const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/programsImages");
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${timestamp}.${fileExtension}`);
    },
});

const upload = multer({storage});

//route that uses the multer library to recieve a file and invokes the create program api and only user type coach is allowed to use it
router.post("/", upload.single("file"), coachMiddleWare, createProgram);

//route that invokes the get programs api
router.get("/", getPrograms);

//route that invokes the update program api and only user type coach is allowed to use it
router.patch("/:id", coachMiddleWare, updateProgram);
export default router;
