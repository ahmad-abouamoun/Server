import {Router} from "express";
import {getExperts, getUsers, Signin} from "../Controller/userController.js";

const router = new Router();

router.get("/", getUsers);
router.get("/experts", getExperts);

router.post("/signin", Signin);

export default router;
