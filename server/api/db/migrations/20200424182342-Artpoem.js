"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await Promise.all([
			queryInterface.createTable("Users", {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				admin: {
					type: Sequelize.BOOLEAN,
					defaultValue: 0,
					allowNull: false,
				},
				profilePicture: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			}),
			queryInterface.createTable("Collections", {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				public: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				UserId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
						key: "UserId",
					},
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			}),
			queryInterface.createTable("ArtPoems", {
				id: {
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
				imageUrl: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				CollectionId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Collections",
						key: "CollectionId",
					},
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			}),
			queryInterface.createTable("Comments", {
				id: {
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
				ArtPoemId: {
					type: Sequelize.INTEGER,
					references: {
						model: "ArtPoems",
						key: "ArtPoemId",
					},
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			}),
		]).catch(e => console.log(e));
	},

	down: async queryInterface => {
		return await Promise.all([
			queryInterface.dropTable("Users"),
			queryInterface.dropTable("Collections"),
			queryInterface.dropTable("ArtPoems"),
			queryInterface.dropTable("Comments"),
		]).catch(e => console.log(e));
	},
};
