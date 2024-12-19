import {Router} from "express";
import {createFood} from "../Controller/foodController";

const router = new Router();

router.post("/", createFood);
