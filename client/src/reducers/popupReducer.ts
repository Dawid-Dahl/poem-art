import {PopupActionTypes} from "../actions/popupActions";

export type PopupReducerState = {
	isShowingPopup: boolean;
};

const initialState: PopupReducerState = {
	isShowingPopup: false,
};

export const popupReducer = (
	state: PopupReducerState = initialState,
	action: PopupActionTypes
): PopupReducerState => {
	switch (action.type) {
		case "SHOW_ADD_COLLECTION_POPUP":
			return {...state, isShowingPopup: true};
		case "HIDE_ADD_COLLECTION_POPUP":
			return {...state, isShowingPopup: false};
		default:
			return state;
	}
};
