import {
	START_LOADING,
	END_LOADING,
	FETCH_ALL,
	FETCH_USER,
	DELETE,
	UPDATE,
} from "../constants/actionTypesUser";
import userApi from "../api/user";
import { CREATE } from "../constants/actionTypes";

export const getUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await userApi.detailUser(id);
		dispatch({ type: FETCH_USER, payload: { user: data } });
	} catch (error) {
		console.log(error);
	}
};

export const getUsers = () => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const res = await userApi.allUsers();
		dispatch({ type: FETCH_ALL, payload: { data: res.data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const res = await userApi.deleteUser(id);
		dispatch({ type: DELETE, payload: id });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const saveUser = (user) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await userApi.saveUser(user);

		if (user._id) {
			dispatch({ type: UPDATE, payload: data });
		} else {
			dispatch({ type: CREATE, payload: data });
		}
	} catch (error) {
		console.log(error);
	}
};
