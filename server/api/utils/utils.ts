import {AuthJsonResponse, xTokenPayload, ArtPoem} from "../../types/types";
import {Repository} from "typeorm";

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

export const doesPoemIncludeCollection = (poem: ArtPoem | undefined, collectionId: number) => {
	if (!poem)
		throw new Error(
			"poem argument wasn't properly passed or couldn't be found in the database"
		);
	if (!collectionId) throw new Error("collectionId argument wasn't properly passed");

	return poem.collections.find(poem => poem.id === collectionId) ? true : false;
};

export const addCollectionToPoemAndRemoveAllOtherCollections = (
	artPoemRepo: Repository<ArtPoem>
) => async (poem: ArtPoem, poemCollectionId: number) => {
	const artPoem = await artPoemRepo.findOne(poem, {
		relations: ["collections"],
	});
};
