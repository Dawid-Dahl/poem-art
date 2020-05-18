export const showFlash = () =>
	({
		type: "SHOW_FLASH",
	} as const);

export const hideFlash = () =>
	({
		type: "HIDE_FLASH",
	} as const);

export const setFlashMessage = (message: string) =>
	({
		type: "SET_FLASH_MESSAGE",
		message,
	} as const);

export const removeFlashMessage = () =>
	({
		type: "REMOVE_FLASH_MESSAGE",
	} as const);

export type ReduxFlashState = "flash";

export type FlashActionTypes =
	| ReturnType<typeof showFlash>
	| ReturnType<typeof hideFlash>
	| ReturnType<typeof setFlashMessage>
	| ReturnType<typeof removeFlashMessage>;
