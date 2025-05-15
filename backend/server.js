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
import feedbackRoute from "./routes/feedback.route.js";

dotenv.config();

// Create Express app
const app = express();

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/feedback", feedbackRoute);

// WebSocket logic
const activeUsers = {}; // { docId: { socketId: { username, profilePhoto, teamId, active: boolean } } }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", ({ docId, username, teamId, profilePhoto }) => {
    socket.join(docId);

    if (!activeUsers[docId]) activeUsers[docId] = {};
    activeUsers[docId][socket.id] = {
      username,
      teamId,
      profilePhoto,
      active: false,
    };

    // Emit activity log
    io.emit("activity-log", {
      user: username,
      action: "connected in",
      target: `Collaborative editor`,
      avatar: profilePhoto,
      badgeColor: "green",
      time: new Date().toISOString(),
    });

    io.to(docId).emit("active-users", Object.values(activeUsers[docId]));
    console.log(`${username} joined doc ${docId}`);
  });

  socket.on("user-activity", ({ docId }) => {
    if (activeUsers[docId]?.[socket.id]) {
      activeUsers[docId][socket.id].active = true;

      io.to(docId).emit("active-users", Object.values(activeUsers[docId]));

      setTimeout(() => {
        if (activeUsers[docId]?.[socket.id]) {
          activeUsers[docId][socket.id].active = false;
          io.to(docId).emit("active-users", Object.values(activeUsers[docId]));
        }
      }, 3000);
    }
  });

  socket.on("send-changes", ({ docId, content }) => {
    socket.to(docId).emit("receive-changes", content);
    socket.emit("user-activity", { docId }); // Trigger self
  });

  socket.on("disconnect", () => {
    for (const docId in activeUsers) {
      if (activeUsers[docId][socket.id]) {
        const { username, profilePhoto } = activeUsers[docId][socket.id];

        // Emit activity log
        io.emit("activity-log", {
          user: username,
          action: "disconnected from",
          target: `Collaborative Editor`,
          avatar: profilePhoto,
          badgeColor: "red",
          time: new Date().toISOString(),
        });

        delete activeUsers[docId][socket.id];
        io.to(docId).emit("active-users", Object.values(activeUsers[docId]));
      }
    }

    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
