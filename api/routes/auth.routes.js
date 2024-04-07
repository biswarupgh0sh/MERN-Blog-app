import express from "express";
import { signup, signupGet } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

//will delete it later
router.get("/signup", signupGet);

export default router;
