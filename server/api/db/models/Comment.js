"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"ArtPoem",
		{
			comment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			author: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			likes: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			artpoem_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "ArtPoems",
					key: "artpoem_id",
				},
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			underscored: true,
		}
	);
	User.associate = function (models) {
		// associations can be defined here
	};
	return User;
};
