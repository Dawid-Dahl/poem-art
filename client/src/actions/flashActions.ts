export const showFlash = (message: string) =>
	({
		type: "SHOW_FLASH",
		message,
	} as const);

export const showFlashFulfilled = (message: string) =>
	({
		type: "SHOW_FLASH_FULFILLED",
		message,
	} as const);

export const hideFlash = () =>
	({
		type: "HIDE_FLASH",
	} as const);

export type ReduxFlashState = "flash";

export type FlashActionTypes =
	| ReturnType<typeof showFlash>
	| ReturnType<typeof showFlashFulfilled>
	| ReturnType<typeof hideFlash>;
