import {Router} from "express";
import {getUsers} from "../Controller/userController.js";

const router = new Router();
router.get("/", getUsers);
export default router;
