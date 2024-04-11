import express from "express";
import { signup, signupGet, signin } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

//will delete it later
router.get("/signup", signupGet);

export default router;
