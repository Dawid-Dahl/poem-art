"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Collections",
			[
				{
					name: "Sad Poems",
					public: true,
					UserId: 1,
				},
				{
					name: "Cat Poems",
					public: false,
					UserId: 1,
				},
				{
					name: "Inspiring",
					public: true,
					UserId: 3,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Collections", null, {});
	},
};
