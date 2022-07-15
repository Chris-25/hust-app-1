import messageController from "../controllers/message.controller.js";
import express from "express";
const router = express.Router();

router.post("/add-msg/", messageController.addMessage);
router.post("/get-msg/", messageController.getMessages);

export default router;
