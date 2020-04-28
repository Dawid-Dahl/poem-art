"use strict";
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			id: {
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
			createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
			updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
		},
		{
			timestamps: false,
		}
	);
	Comment.associate = function (models) {
		Comment.belongsTo(models.ArtPoem, {
			foreignKey: {
				allowNull: false,
			},
		});
	};
	return Comment;
};
