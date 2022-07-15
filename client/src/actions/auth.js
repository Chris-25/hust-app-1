import { AUTH } from "../constants/actionTypes";
import userApi from "../api/user";

export const signin = (formData, router) => async (dispatch) => {
	try {
		const { data } = await userApi.signIn(formData);

		dispatch({ type: AUTH, data });

		if (data && data.result && data.result.role === "admin") {
			router.push("/admin/users");
		} else {
			router.push("/");
		}
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData, router) => async (dispatch) => {
	try {
		const { data } = await userApi.signUp(formData);

		dispatch({ type: AUTH, data });

		router.push("/");
	} catch (error) {
		console.log(error);
	}
};
