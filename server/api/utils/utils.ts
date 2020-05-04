import {AuthJsonResponse} from "../types/types";

export const removeBearerFromTokenHeader = (tokenHeader?: string) => tokenHeader?.split(" ")[1];

export const jsonResponse = (
	success: boolean,
	payload?: NodeJS.ReadableStream | undefined
): AuthJsonResponse => (!payload ? {success} : {success, payload});
