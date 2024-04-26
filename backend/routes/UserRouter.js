import express from "express";
import { login, logout, register } from "../controllers/UserController.js";

const router = express.Router();

router.route("/new").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
