import {AuthJsonResponse, xTokenPayload, ArtPoem, Collection} from "../../types/types";
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
	if (!poem.collections) throw new Error("poem doesn't contain collection field");
	if (!collectionId) throw new Error("collectionId argument wasn't properly passed");

	return poem.collections.find(poem => poem.id === collectionId) ? true : false;
};

export const addCollectionToPoemAndRemoveAllOtherCollections = (
	artPoemRepo: Repository<ArtPoem>,
	collectionRepo: Repository<Collection>
) => async (poemId: number, poemCollectionId: number) => {
	const artPoem = await artPoemRepo.findOne(poemId);
	const collectionToChangeTo = await collectionRepo.findOne(poemCollectionId);

	if (!artPoem) throw new Error(`No poem with ID: ${poemId} could be found in DB`);
	if (!collectionToChangeTo)
		throw new Error(`No collection with ID: ${poemCollectionId} could be found in DB`);

	artPoem.collections = [collectionToChangeTo];

	artPoemRepo.save(artPoem);
};
