"use strict";
module.exports = (sequelize, DataTypes) => {
	const ArtPoem = sequelize.define(
		"ArtPoem",
		{
			id: {
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
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
			updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
		},
		{
			timestamps: false,
		}
	);
	ArtPoem.associate = function (models) {
		ArtPoem.belongsTo(models.Collection, {
			foreignKey: "collectionId",
		});

		ArtPoem.hasMany(models.Comment, {
			foreignKey: "commentId",
		});
	};
	return ArtPoem;
};
