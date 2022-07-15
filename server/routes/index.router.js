import messageRouter from "./message.router.js";
import postRouter from "./posts.router.js";
import userRouter from "./user.router.js";

function route(app) {
	app.use("/posts", postRouter);
	app.use("/user", userRouter);
	app.use("/chat", messageRouter);
}

export default route;
