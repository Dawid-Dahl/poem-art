import {PoemActionTypes} from "../actions/poemAction";
import {Artpoem} from "../types/types";
import {range, createDummyPoem} from "../utils/utils";

export type PoemReducerState = {
	poems: Artpoem[] | null;
};

const initialState: PoemReducerState = {
	poems: range(1, 10).map(x =>
		createDummyPoem(
			x,
			`This Is The Title ${x * 2}`,
			"Roses are red, violets are awesome",
			`https://i.picsum.photos/id/${Math.floor(Math.random() * 100)}/600/300.jpg`,
			Date.now(),
			Math.round(Math.random() * 30)
		)
	),
};

export const poemReducer = (
	state: PoemReducerState = initialState,
	action: PoemActionTypes
): PoemReducerState => {
	switch (action.type) {
		case "REMOVE_ALL_POEMS":
			return {...state, poems: []};
		default:
			return state;
	}
};
