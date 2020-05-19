import {Artpoem} from "../types/types";
import {FluxStandardAction} from "redux-promise-middleware";

export type PoemReducerState = {
	poems: Artpoem[] | null;
};

const initialState: PoemReducerState = {
	poems: [
		{
			id: 1000000,
			title: "Add Your First Poem!",
			content: "Unleash your creative self!",
			imageUrl:
				"https://www.xrite.com/-/media/xrite/images/flex-promos/homepage-hero-banner-interactive/main-hero-lg.jpg?la=en&hash=25DAE70673CEF2F6874D650304F76768B71CE19C",
			likes: 0,
			userId: "user",
		},
	],
};

export const poemReducer = (
	state: PoemReducerState = initialState,
	action: FluxStandardAction
): PoemReducerState => {
	switch (action.type) {
		case "GET_ALL_POEMS":
			return {...state, poems: action.payload};
		case "REMOVE_ALL_POEMS":
			return {...state, poems: []};
		default:
			return state;
	}
};
