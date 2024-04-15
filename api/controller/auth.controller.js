import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import "dotenv/config";

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
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new user({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const response = await newUser.save();
    res.status(200).json("SignUp successful");
    console.log("response saved");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All "));
  }

  try {
    const response = await user.findOne({ email: email });

    if (!response) {
      return next(errorHandler(400, "User not found"));
    }

    const validPass = bcryptjs.compareSync(password, response.password);

    if (!validPass) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...rest } = response._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const validUser = await user.findOne({ email });
    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = validUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new user({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
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
