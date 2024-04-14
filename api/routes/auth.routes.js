import express from "express";
import { signup, signupGet, signin, google } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google)

//will delete it later
router.get("/signup", signupGet);

export default router;
