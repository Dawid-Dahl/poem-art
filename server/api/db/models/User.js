"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			profile_picture: {
				type: DataTypes.STRING,
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
