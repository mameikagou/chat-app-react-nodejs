import express from "npm:express@^4.17";
import cors from "npm:cors";
import mongoose from "npm:mongoose";
// import socket from "npm:socket.io";
import { Server as  SocketIOServer } from "npm:socket.io";
import dotenv from "npm:dotenv";
import authRoutes from "./routes/auth.ts";
import messageRoutes from "./routes/messages.ts";
import User from "./models/userModel.ts";

dotenv.config();
import process from "node:process";

const app = express();
// 中间件
app.use(cors());
app.use(express.json());

  // 连接到 MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);



const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//  global is not available in the global scope in Deno. Use globalThis instead;
globalThis.onlineUsers = new Map();
io.on("connection", (socket) => {
  globalThis.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
