"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Collections",
			[
				{
					name: "Sad Poems",
					public: true,
				},
				{
					name: "Cat Poems",
					public: false,
				},
				{
					name: "Inspiring",
					public: true,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Collections", null, {});
	},
};
