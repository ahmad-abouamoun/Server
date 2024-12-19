import {Router} from "express";
import {getUsers} from "../Controller/userController.js";

const router = new Router();

router.get("/", getUsers);
router.get("/experts", getExperts);

export default router;
