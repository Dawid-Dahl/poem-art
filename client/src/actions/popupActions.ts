export const showPopup = () =>
	({
		type: "SHOW_POPUP",
	} as const);

export const hidePopup = () =>
	({
		type: "HIDE_POPUP",
	} as const);

export type ReduxPopupState = "popup";

export type PopupActionTypes = ReturnType<typeof showPopup> | ReturnType<typeof hidePopup>;
