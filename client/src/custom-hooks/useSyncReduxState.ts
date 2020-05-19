import {useEffect} from "react";
import {User, ReduxStates} from "../types/types";
import store from "../store";
import {refreshAndSetXToken} from "../utils/utils";
import {getAllCollections} from "../actions/collectionActions";
import {getAllPoems} from "../actions/poemActions";

const syncReduxPoemsStateWithDb = async (user?: User) => {
	if (!user) return;

	await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

	try {
		const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/artPoem/get-all`, {
			headers: {
				"x-token": localStorage.getItem("x-token") ?? "null",
			},
		});

		const {payload} = await res.json();

		if (JSON.parse(JSON.parse(payload).poems).length === 0) return;

		console.log("Redux store synced!");
	} catch (e) {
		console.log(e);
	}
};

const syncReduxCollectionsStateWithDb = async (user?: User) => {
	if (!user) return;

	await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

	try {
		const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/collections/get-all`, {
			headers: {
				"x-token": localStorage.getItem("x-token") ?? "null",
			},
		});

		const {payload} = await res.json();

		store.dispatch(getAllCollections(JSON.parse(payload)));

		console.log("Redux store synced!");
	} catch (e) {
		console.log(e);
	}
};

/** This hook takes a user and a state string/an array of state strings - and syncs the redux state with the main database.
 *
 * If no state string/an array of state strings is supplied, all states will be synced.
 *
 * Returns void.
 */
export const useSyncReduxState = (user: User, states?: ReduxStates | ReduxStates[]) => {
	if (!user) return;

	try {
		if (!states) {
			useEffect(() => {
				syncReduxCollectionsStateWithDb(user);
				syncReduxPoemsStateWithDb(user);
			}, []);
			return;
		}

		if (states === "poem" || states?.includes("poem")) {
			useEffect(() => {
				syncReduxPoemsStateWithDb(user);
			}, []);
			return;
		}

		if (states === "collection" || states?.includes("collection")) {
			useEffect(() => {
				syncReduxCollectionsStateWithDb(user);
			}, []);
			return;
		}
	} catch (e) {
		console.log(e);
	}
};
