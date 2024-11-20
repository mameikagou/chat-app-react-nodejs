import express, { Request, Response } from "npm:express@^4.17";
import cors from "npm:cors";
import mongoose from "npm:mongoose";
// import socket from "npm:socket.io";
import { Server as SocketIOServer } from "npm:socket.io";
import dotenv from "npm:dotenv";
import authRoutes from "./routes/auth.ts";
import messageRoutes from "./routes/messages.ts";
import User from "./models/userModel.ts";
import { getValue, setValue } from "node-global-storage";
dotenv.config();
import process from "node:process";
import { onlineUserType } from "./types/user.ts"
import {ClientToServerEvents} from './types/socket.ts'

const app = express();
// 中间件
app.use(cors());
app.use(express.json());

// 连接到 MongoDB
try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connection Successful");
} catch (err) {
  console.error("DB Connection Error:", err);
}

app.get("/ping", (_req: Request, res: Response) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/users", async (_req: Request, res: Response) => {
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

const io = new SocketIOServer<ClientToServerEvents,ClientToServerEvents>(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});



setValue<onlineUserType[]>('onlineUsers', []);

io.on("connection", (socket) => {

  setValue('socket', socket)
  // 当用户添加时，将用户ID和socket ID存储在onlineUsers中

  socket.on("add-user", (userId) => {

    const onlineUsers = getValue<onlineUserType[]>('onlineUsers');

    setValue<onlineUserType[]>('onlineUsers', [...onlineUsers, { userId: userId, socketId: socket.id }]);
  });
});
