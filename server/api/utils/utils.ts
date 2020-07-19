import {AuthJsonResponse, xTokenPayload, ArtPoem} from "../../types/types";

export const removeBearerFromTokenHeader = (tokenHeader?: string) => tokenHeader?.split(" ")[1];

export const jsonResponse = (
	success: boolean,
	payload?: string | NodeJS.ReadableStream | undefined
): AuthJsonResponse => (!payload ? {success} : {success, payload});

export const extractPayloadFromBase64JWT = (jwt: string | undefined): xTokenPayload | undefined =>
	!jwt
		? undefined
		: [jwt]
				.map(x => x.split(".")[1])
				.map(x => Buffer.from(x, "base64"))
				.map(x => x.toString("utf8"))
				.map(x => JSON.parse(x))[0];

export const replaceSpacesInString = (str: string, replaceWith: string): string =>
	str.replace(/\s/g, replaceWith);

export const doesPoemIncludeCollection = (poem: ArtPoem, collectionId: number) => {
	return true;
};
