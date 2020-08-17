import {Bucket} from "@google-cloud/storage";

export const deleteGCSFile = async (bucket: Bucket, name: string) => {
	await bucket.file(name).delete();

	console.log(`gs://${bucket.name}/${name} deleted.`);
};
