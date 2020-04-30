"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"ArtPoems",
			[
				{
					title: "My Way",
					content:
						"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					likes: 32,
					imageUrl: "https://i.picsum.photos/id/12/600/300.jpg",
					CollectionId: 1,
				},
				{
					title: "So Sad!",
					content:
						"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					likes: 0,
					imageUrl: "https://i.picsum.photos/id/72/600/300.jpg",
					CollectionId: 2,
				},
				{
					title: "Winter's Coming...",
					content:
						"Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					likes: 2,
					imageUrl: "https://i.picsum.photos/id/83/600/300.jpg",
					CollectionId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("ArtPoems", null, {});
	},
};
