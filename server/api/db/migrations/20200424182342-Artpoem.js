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
				profile_picture: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				created_at: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updated_at: {
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
				user_id: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
						key: "user_id",
					},
					allowNull: false,
				},
				created_at: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updated_at: {
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
				image_url: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				collection_id: {
					type: Sequelize.INTEGER,
					references: {
						model: "Collections",
						key: "collection_id",
					},
					allowNull: false,
				},
				created_at: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updated_at: {
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
				artpoem_id: {
					type: Sequelize.INTEGER,
					references: {
						model: "ArtPoems",
						key: "art_poem_id",
					},
					allowNull: false,
				},
				created_at: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updated_at: {
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