import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new user({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const response = await newUser.save();
    res.status(200).json(response);
    console.log("response saved");
  } catch (error) {
    next(error);
  }
};


//will delete it later

export const signupGet = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
