import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import usersController from "./controllers/users";
import adminController from "./controllers/admin";
import votesController from "./controllers/votes";
import candidatesController from "./controllers/candidates";
import connectToMongo from "./config/db";
import http from "http";
import { Server } from "socket.io";
import { handleSocketConnection } from "./sockets/io";

const PORT = 3000;

export const app = express();

connectToMongo();
const httpServer = http.createServer(app);
export const io = new Server(httpServer);

io.on("connection", handleSocketConnection);

app.use(express.json());
app.use(cors());

app.use("/api/users", usersController);
app.use("/api/admin", adminController);
app.use("/api/votes", votesController);
app.use("/api/candidates", candidatesController);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

httpServer.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});
