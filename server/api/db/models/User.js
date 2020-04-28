"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
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
				defaultValue: 0,
			},
			profile_picture: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
			updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
		},
		{
			timestamps: false,
		}
	);
	User.associate = function (models) {
		User.hasMany(models.Collection, {
			foreignKey: {
				allowNull: false,
			},
		});
	};
	return User;
};
