import express from "express";
const router = express.Router();

import userController from "../controllers/user.controller.js";

const { signin, signup, allUsers, save, deleteUser, detailUser } =
	userController;

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/all", allUsers);
router.post("/save", save);
router.delete("/delete/:id", deleteUser);
router.get("/detail/:id", detailUser);

export default router;
