import {refreshAndSetXToken} from "../utils/utils";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";
import {Action} from "redux";
import {getAllPoems} from "../actions/poemActions";

const refreshAndFetchAllArtPoems = async () => {
	await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

	try {
		const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/artPoem/get-all`, {
			headers: {
				"x-token": localStorage.getItem("x-token") ?? "null",
			},
		});

		const {payload} = await res.json();

		if (JSON.parse(JSON.parse(payload).poems).length === 0) return;

		return JSON.parse(JSON.parse(payload).poems);
	} catch (e) {
		console.log(e);
	}
};

export const thunkGetAllArtPoems = (): ThunkAction<
	any,
	RootState,
	any,
	Action
> => async dispatch => {
	try {
		const asyncResponse = await refreshAndFetchAllArtPoems();

		if (!asyncResponse) return;

		dispatch(getAllPoems(asyncResponse));
	} catch (e) {
		console.log(e);
	}
};
