import {ReduxArtPoem} from "../types/types";
import {PoemActionTypes} from "../actions/poemActions";

export type PoemReducerState = {
	poems: ReduxArtPoem[];
	poemSelected: ReduxArtPoem;
	error: null | Error;
};

export const welcomePoem: ReduxArtPoem = {
	id: 1,
	title: "Unleash Your Creative Self!",
	content: "Click the Upload button up above to add your very first Artpoem!",
	imageUrl:
		"https://www.xrite.com/-/media/xrite/images/flex-promos/homepage-hero-banner-interactive/main-hero-lg.jpg?la=en&hash=25DAE70673CEF2F6874D650304F76768B71CE19C",
	likes: 0,
	userId: "welcomePoem",
	collections: [],
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
	collections: [],
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
	collections: [],
};

const initialState: PoemReducerState = {
	poems: [welcomePoem],
	poemSelected: initPoem,
	error: null,
};

export const poemReducer = (
	state: PoemReducerState = initialState,
	action: PoemActionTypes
): PoemReducerState => {
	switch (action.type) {
		case "GET_POEM_FULFILLED":
			return {...state, poemSelected: action.artPoem};
		case "GET_POEM_FAILED":
			return state.poems?.length === 1 && state.poems[0].userId === "welcomePoem"
				? {...state, poemSelected: welcomePoem}
				: {...state, poemSelected: poemNotFound};
		case "DESELECT_POEM":
			return {...state, poemSelected: initPoem};
		case "GET_ALL_POEMS_FULFILLED":
			return {...state, poems: action.artPoems};
		case "GET_ALL_POEMS_FAILED":
			return {...state, error: action.error};
		case "GET_POEMS_BY_COLLECTION_FULFILLED":
			return {...state, poems: action.artPoems};
		case "GET_POEMS_BY_COLLECTION_FAILED":
			return {...state, error: action.error};
		case "GET_POEMS_BY_USER_ID_FULFILLED":
			return {...state, poems: action.artPoems};
		case "GET_POEMS_BY_USER_ID_FAILED":
			return {...state, error: action.error};
		case "DELETE_ALL_POEMS":
			return {...state, poems: []};
		case "DELETE_POEM_FULFILLED":
			return {...state, poems: state.poems.filter(poem => poem.id !== action.artPoemId)};
		default:
			return state;
	}
};
