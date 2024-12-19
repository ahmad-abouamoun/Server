import {Router} from "express";
import {getUsers} from "../Controller/userController";

const router = new Router();
router.get("/", getUsers);
export default router;
