import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import teamRoute from "./routes/team.route.js";
import documentRoute from "./routes/document.route.js";
import versionRoute from "./routes/version.route.js";
import suggestionRoute from "./routes/suggestion.route.js";
dotenv.config({});

const app = express();

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am comming form backend",
    success: true,
  });
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// all API
app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);
app.use("/api/document", documentRoute);
app.use("/api/version", versionRoute);
app.use("/api/suggestion", suggestionRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
