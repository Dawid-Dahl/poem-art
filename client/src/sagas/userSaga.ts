import {takeEvery, call, put} from "redux-saga/effects";

import {apiService} from "../api/apiService";
import {convertToBytes, parseMainApiResponse} from "../utils/utils";
import {updateProfileImage, updateProfileImageFulfilled} from "../actions/userActions";
import {showFlash} from "../actions/flashActions";
import {User} from "../types/types";

function* workerUpdateProfileImage({imageFile}: ReturnType<typeof updateProfileImage>) {
	const image = imageFile.get("profilePictureInput") as File;

	try {
		const bytes = convertToBytes("5 mb");

		if (!bytes) return;

		if (image.size >= bytes) {
			yield put(showFlash("Please choose an image smaller than 5 MB in size"));
			return;
		}

		const res = yield call(apiService.refreshAndFetch, "profile/post-profile-image", {
			method: "POST",
			body: imageFile,
		});

		const json = yield call([res, "json"]);

		const insertResult: User = JSON.parse(parseMainApiResponse(json).insertResult);

		yield put(showFlash(JSON.parse(json.payload).message));
		yield put(updateProfileImageFulfilled(insertResult.profilePicture));
	} catch (e) {
		console.log(e);
	}
}

function* userSaga() {
	yield takeEvery("UPDATE_PROFILE_PICTURE", workerUpdateProfileImage);
}

export default userSaga;
