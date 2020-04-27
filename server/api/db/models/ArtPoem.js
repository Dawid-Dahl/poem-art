"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"ArtPoem",
		{
			artpoem_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			likes: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			collection_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Collections",
					key: "collection_id",
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
