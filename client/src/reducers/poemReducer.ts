import {ReduxArtPoem} from "../types/types";
import {PoemActionTypes} from "../actions/poemActions";

export type PoemReducerState = {
	poems: ReduxArtPoem[] | null;
	poemSelected: ReduxArtPoem;
};

const initPoem: ReduxArtPoem = {
	id: 0,
	title: "",
	content: "",
	imageUrl: "",
	createdAt: 0,
	likes: 0,
	comments: [],
	userId: "user",
};

const poemNotFound: ReduxArtPoem = {
	id: -1,
	title: "POEM NOT FOUND",
	content: "Sorry!",
	imageUrl: "",
	createdAt: 0,
	likes: 0,
	comments: [],
	userId: "user",
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
	poemSelected: initPoem,
};

export const poemReducer = (
	state: PoemReducerState = initialState,
	action: PoemActionTypes
): PoemReducerState => {
	switch (action.type) {
		case "GET_POEM_FULFILLED":
			return {...state, poemSelected: action.artPoem};
		case "GET_POEM_FAILED":
			return {...state, poemSelected: poemNotFound};
		case "DESELECT_POEM":
			return {...state, poemSelected: initPoem};
		case "GET_ALL_POEMS_FULFILLED":
			return {...state, poems: action.artPoems};
		case "REMOVE_ALL_POEMS":
			return {...state, poems: []};
		default:
			return state;
	}
};
