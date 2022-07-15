import {
	START_LOADING,
	END_LOADING,
	FETCH_ALL,
	FETCH_POST,
	FETCH_BY_SEARCH,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	COMMENT,
	FETCH_BY_CREATOR,
	FETCH_ALL_ADMIN,
} from "../constants/actionTypes";

import postApi from "../api/post";

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await postApi.fetchPost(id);
		// console.log(x);

		dispatch({ type: FETCH_POST, payload: { post: data } });
	} catch (error) {
		console.log(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data, currentPage, numberOfPages },
		} = await postApi.fetchPosts(page);

		dispatch({
			type: FETCH_ALL,
			payload: { data, currentPage, numberOfPages },
		});
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getAllPosts = () => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await postApi.fetchAllPosts();

		dispatch({ type: FETCH_ALL_ADMIN, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsByCreator = (name) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await postApi.fetchPostsByCreator(name);

		dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostByQuery = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await postApi.fetchPostsBySearch(searchQuery);

		dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await postApi.createPost(post);

		dispatch({ type: CREATE, payload: data });

		history.push(`/posts/${data._id}`);
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await postApi.updatePost(id, post);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("profile"));

	try {
		const { data } = await postApi.likePost(id, user?.token);

		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const commentPost = (value, id) => async (dispatch) => {
	try {
		const { data } = await postApi.comment(value, id);

		dispatch({ type: COMMENT, payload: data });

		return data.comments;
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await postApi.deletePost(id);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};
