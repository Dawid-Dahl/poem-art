import {UserActionTypes} from "../actions/userActions";
import {User} from "../types/types";

export type UserReducerState = {
	user: User | null;
};

const initialState: UserReducerState = {
	user: null,
};

export const userReducer = (
	state: UserReducerState = initialState,
	action: UserActionTypes
): UserReducerState => {
	switch (action.type) {
		case "SET_USER":
			return {...state, user: action.user};
		case "REMOVE_USER":
			return {...state, user: null};

		default:
			return state;
	}
};
