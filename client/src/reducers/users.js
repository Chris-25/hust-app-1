import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
} from "../constants/actionTypesUser";

export default (state = { users: [] }, action) => {
	switch (action.type) {
		case "START_LOADING":
			return { ...state, isLoading: true };
		case "END_LOADING":
			return { ...state, isLoading: false };
		case FETCH_ALL:
			return {
				...state,
				users: action.payload.data,
			};
		case CREATE:
			return { ...state, users: [...state.users, action.payload.result] };
		case UPDATE:
			const userResp = action.payload.result;
			return {
				...state,
				users: state.users.map((user) =>
					user._id === userResp._id ? userResp : user
				),
			};
		case DELETE:
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.payload),
			};
		default:
			return state;
	}
};
