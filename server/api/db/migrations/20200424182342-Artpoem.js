"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await Promise.all([
			await queryInterface.createTable("Users", {
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
			await queryInterface.createTable("Collections", {
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
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Users",
						key: "id",
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
			await queryInterface.createTable("ArtPoems", {
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
				collectionId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Collections",
						key: "id",
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
			await queryInterface.createTable("Comments", {
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
				artPoemId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "ArtPoems",
						key: "id",
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
			await queryInterface.dropTable("Comments"),
			await queryInterface.dropTable("ArtPoems"),
			await queryInterface.dropTable("Collections"),
			await queryInterface.dropTable("Users"),
		]).catch(e => console.log(e));
	},
};
