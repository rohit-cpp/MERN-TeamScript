import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./utils/db.js";

// Route Imports
import userRoute from "./routes/user.route.js";
import teamRoute from "./routes/team.route.js";
import documentRoute from "./routes/document.route.js";
import versionRoute from "./routes/version.route.js";
import suggestionRoute from "./routes/suggestion.route.js";
import commentRoute from "./routes/comment.route.js";

dotenv.config();

// Create Express app
const app = express();

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Routes
app.get("/home", (req, res) => {
  res.status(200).json({ message: "I am coming from backend", success: true });
});

app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);
app.use("/api/document", documentRoute);
app.use("/api/version", versionRoute);
app.use("/api/suggestion", suggestionRoute);
app.use("/api/comment", commentRoute);

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-document", (docId) => {
    socket.join(docId);
    console.log(`User ${socket.id} joined document ${docId}`);
  });

  socket.on("send-changes", ({ docId, content }) => {
    socket.to(docId).emit("receive-changes", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
