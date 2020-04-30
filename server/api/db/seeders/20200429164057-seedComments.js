"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Comments",
			[
				{
					author: "Pete",
					comment: "Gives me the chills, dude!",
					likes: 51,
					ArtPoemId: 2,
				},
				{
					author: "Winterson",
					comment: "This sucks...",
					likes: 0,
					ArtPoemId: 1,
				},
				{
					author: "Cooldudez",
					comment: "Awesome poem!",
					likes: 2,
					ArtPoemId: 3,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Comments", null, {});
	},
};
