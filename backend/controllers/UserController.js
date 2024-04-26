import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import UserModel from "../models/UserModel.js";
import { sendCookie } from "../utils/feature.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });

    //already registered user is not allowed to register again
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashPassword = await bcrypt.hash(password, 10);
    user = await UserModel.create({ name, email, password: hashPassword });
    sendCookie(user, res, "Register Successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    //if user does not exist
    if (!user) return next(new ErrorHandler("Invalid email & password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    // if required password is not match
    if (!isMatch)
      return next(new ErrorHandler("Invalid email & password", 400));

    sendCookie(user, res, `Welcome Back ${user.email}`, 200);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .status(200)
    .json({
      success: true,
      message: "User Logout Successfully",
      user: req.user,
    });
};
