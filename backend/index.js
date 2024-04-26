import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import "express-async-errors";
import connectionDB from "./database/db.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/ErrorHandler.js";
import UserRouter from "./routes/UserRouter.js";
import CategoryRouter from "./routes/CategoryRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import multer from "multer";
dotenv.config();

const app = express();
// const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

connectionDB();

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(process.env.PORT, () => {
  console.log(`server running on PORT: ${process.env.PORT}`);
});
