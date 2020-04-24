"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.createTable(
					"ArtPoems",
					{
						artpoem_id: {
							type: Sequelize.INTEGER,
							allowNull: false,
							autoIncrement: true,
							primaryKey: true,
						},
						title: {
							type: Sequelize.STRING,
							allowNull: false,
						},
						content: {
							type: Sequelize.STRING,
							allowNull: false,
						},
						likes: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
						comments: {
							type: Sequelize.JSON,
							allowNull: false,
						},
						image_url: {
							type: Sequelize.STRING,
							allowNull: false,
						},
					},
					{transaction: t}
				),
				queryInterface.createTable(
					"Collections",
					{
						collection_id: {
							type: Sequelize.INTEGER,
							allowNull: false,
							autoIncrement: true,
							primaryKey: true,
						},
						name: {
							type: Sequelize.STRING,
							allowNull: false,
						},
						poems: {
							type: Sequelize.JSON,
							allowNull: false,
						},
						owner: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
					},
					{transaction: t}
				),
				queryInterface.createTable(
					"Comments",
					{
						comment_id: {
							type: Sequelize.INTEGER,
							allowNull: false,
							autoIncrement: true,
							primaryKey: true,
						},
						author: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
						comment: {
							type: Sequelize.STRING,
							allowNull: false,
						},
						likes: {
							type: Sequelize.INTEGER,
							allowNull: false,
						},
						belongs_to: {
							type: Sequelize.INTEGER,
							references: {
								model: "ArtPoems",
								key: "artpoem_id",
							},
							allowNull: false,
						},
					},
					{transaction: t}
				),
			]);
		});
	},

	down: queryInterface => {
		return queryInterface.sequelize.transaction(async t => {
			return await Promise.all([
				queryInterface.dropTable("ArtPoems", {transaction: t}),
				queryInterface.dropTable("Collections", {transaction: t}),
				queryInterface.dropTable("Comments", {transaction: t}),
			]);
		});
	},
};
