import {ReduxArtPoem} from "../types/types";

export const welcomePoem: ReduxArtPoem = {
	id: 1,
	title: "Unleash Your Creative Self!",
	content: "Click the Upload button up above to add your very first Artpoem!",
	imageUrl:
		"https://www.xrite.com/-/media/xrite/images/flex-promos/homepage-hero-banner-interactive/main-hero-lg.jpg?la=en&hash=25DAE70673CEF2F6874D650304F76768B71CE19C",
	likes: 0,
	userId: "welcomePoem",
	createdAt: "",
	updatedAt: "",
	collections: [],
};

export const initPoem: ReduxArtPoem = {
	id: 0,
	title: "",
	content: "",
	imageUrl: "",
	likes: 0,
	comments: [],
	userId: "user",
	createdAt: "",
	updatedAt: "",
	collections: [],
};

export const poemNotFound: ReduxArtPoem = {
	id: -1,
	title: "POEM NOT FOUND",
	content: "Sorry!",
	imageUrl: "",
	likes: 0,
	comments: [],
	userId: "user",
	createdAt: "",
	updatedAt: "",
	collections: [],
};
