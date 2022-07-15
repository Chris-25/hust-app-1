import API from ".";

class PostApi {
	async fetchPost(id) {
		return await API.get(`/posts/${id}`);
	}

	async fetchPosts(page) {
		return await API.get(`/posts?page=${page}`);
	}

	async fetchAllPosts() {
		return await API.get(`/posts/all`);
	}

	async fetchPostsByCreator(name) {
		return await API.get(`/posts/creator?name=${name}`);
	}

	async fetchPostsBySearch(searchQuery) {
		return await API.get(
			`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
				searchQuery.tags
			}`
		);
	}

	async createPost(newPost) {
		return await API.post("/posts", newPost);
	}

	async likePost(id) {
		return await API.patch(`/posts/${id}/likePost`);
	}

	async comment(value, id) {
		return await API.post(`/posts/${id}/commentPost`, { value });
	}

	async updatePost(id, updatedPost) {
		return await API.patch(`/posts/${id}`, updatedPost);
	}

	async deletePost(id) {
		return await API.delete(`/posts/${id}`);
	}
}

const postApi = new PostApi();

export default postApi;
