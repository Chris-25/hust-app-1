import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connect from "./config/db/index.db.js";
import route from "./routes/index.router.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

route(app);

connect();

httpServer.listen(PORT, () =>
	console.log(`Server Running on Port: http://localhost:${PORT}`)
);

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
	console.log(`${socket.id} is connected`);

	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg);
		}
	});
});
