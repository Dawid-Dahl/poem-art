import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {Collection} from "../../db/entities/Collection";

export const addCollectionController = async (req: Request, res: Response) => {
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);
};
