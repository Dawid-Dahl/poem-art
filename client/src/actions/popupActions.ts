export const showPopup = () =>
	({
		type: "SHOW_ADD_COLLECTION_POPUP",
	} as const);

export const hidePopup = () =>
	({
		type: "HIDE_ADD_COLLECTION_POPUP",
	} as const);

export type ReduxPopupState = "popup";

export type PopupActionTypes = ReturnType<typeof showPopup> | ReturnType<typeof hidePopup>;
