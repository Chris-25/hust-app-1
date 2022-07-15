import API from ".";

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const detailUser = (id) => API.get(`/user/detail/${id}`);
export const allUsers = () => API.get("/user/all");
export const deleteUser = (id) => API.delete(`/user/delete/${id}`);
export const saveUser = (userData) => API.post(`/user/save`, userData);

class UserApi {
	async signIn(formData) {
		return await API.post("/user/signin", formData);
	}

	async signUp(formData) {
		return await API.post("/user/signup", formData);
	}

	async detailUser(id) {
		return await API.get(`/user/detail/${id}`);
	}

	async allUsers() {
		return await API.get("/user/all");
	}

	async deleteUser(id) {
		return await API.delete(`/user/delte/${id}`);
	}

	async saveUser(userData) {
		return await API.post(`/user/save`, userData);
	}
}

const userApi = new UserApi();

export default userApi;
