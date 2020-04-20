import {PoemActionTypes} from "../actions/poemAction";
import {Poem} from "../types/types";
import {range, createDummyPoem} from "../utils/utils";

export type PoemReducerState = {
	poems: Poem[] | null;
};

const initialState: PoemReducerState = {
	poems: range(1, 10).map(x =>
		createDummyPoem(
			x,
			`This Is The Title ${x * 2}`,
			"Roses are red, violets are awesome",
			"https://wallup.net/wp-content/uploads/2017/03/16/171381-macro-flowers-desaturated-748x468.jpg",
			Date.now(),
			Math.round(Math.random() * 30)
		)
	),
};

export const poemReducer = (
	state: PoemReducerState = initialState,
	payload: PoemActionTypes
): PoemReducerState => {
	switch (payload.type) {
		default:
			return state;
	}
};
