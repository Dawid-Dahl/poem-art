import {ArtPoem} from "../types/types";
import {PoemActionTypes} from "../actions/poemActions";

export type PoemReducerState = {
	poems: ArtPoem[] | null;
};

const initialState: PoemReducerState = {
	poems: [
		{
			id: 1,
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
	action: PoemActionTypes
): PoemReducerState => {
	switch (action.type) {
		case "GET_ALL_POEMS_FULFILLED":
			return {...state, poems: action.artPoems};
		case "REMOVE_ALL_POEMS":
			return {...state, poems: []};
		default:
			return state;
	}
};
