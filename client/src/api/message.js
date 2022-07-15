import API from ".";
class MessageApi {
	async sendMessage(data) {
		return await API.post("/chat/add-msg", data);
	}

	async receiveMessage(data) {
		return await API.post("/chat/get-msg", data);
	}
}

const messageApi = new MessageApi();

export default messageApi;
