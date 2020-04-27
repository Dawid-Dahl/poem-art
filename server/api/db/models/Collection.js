"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"ArtPoem",
		{
			collection_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			public: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
					key: "user_id",
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
