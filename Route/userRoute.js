import {Router} from "express";
import {getExperts, getUsers} from "../Controller/userController.js";

const router = new Router();

router.get("/", getUsers);
router.get("/experts", getExperts);

export default router;
