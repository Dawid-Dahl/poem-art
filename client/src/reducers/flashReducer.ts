import {FlashActionTypes} from "../actions/flashActions";

export type FlashReducerState = {
	isShowingFlash: boolean;
	flashMessage: string;
};

const initialState: FlashReducerState = {
	isShowingFlash: false,
	flashMessage: "",
};

export const flashReducer = (
	state: FlashReducerState = initialState,
	action: FlashActionTypes
): FlashReducerState => {
	switch (action.type) {
		case "SHOW_FLASH":
			return {...state, isShowingFlash: true};
		case "HIDE_FLASH":
			return {...state, isShowingFlash: false};
		case "SET_FLASH_MESSAGE":
			return {...state, flashMessage: action.message};
		case "REMOVE_FLASH_MESSAGE":
			return {...state, flashMessage: ""};
		default:
			return state;
	}
};
