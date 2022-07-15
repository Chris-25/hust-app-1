import Messages from "../models/messageModel.js";

class MessageController {
	async getMessages(req, res, next) {
		try {
			const { from, to } = req.body;

			const messages = await Messages.find({
				users: {
					$all: [from, to],
				},
			}).sort({ updatedAt: 1 });

			const projectedMessages = messages.map((msg) => {
				return {
					fromSelf: msg.sender.toString() === from,
					message: msg.message.text,
				};
			});
			res.json(projectedMessages);
		} catch (ex) {
			next(ex);
		}
	}

	async addMessage(req, res, next) {
		try {
			const { from, to } = req.body;

			const messages = await Messages.find({
				users: {
					$all: [from, to],
				},
			}).sort({ updatedAt: 1 });

			const projectedMessages = messages.map((msg) => {
				return {
					fromSelf: msg.sender.toString() === from,
					message: msg.message.text,
				};
			});
			res.json(projectedMessages);
		} catch (ex) {
			next(ex);
		}
	}
}

const messageController = new MessageController();

export default messageController;

