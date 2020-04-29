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
				},
				{
					author: "Winterson",
					comment: "This sucks...",
					likes: 0,
				},
				{
					author: "Cooldudez",
					comment: "Awesome poem!",
					likes: 2,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Comments", null, {});
	},
};
