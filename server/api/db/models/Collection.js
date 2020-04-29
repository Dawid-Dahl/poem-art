"use strict";
module.exports = (sequelize, DataTypes) => {
	const Collection = sequelize.define(
		"Collection",
		{
			id: {
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
				defaultValue: true,
			},
			createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
			updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("NOW")},
		},
		{
			timestamps: false,
		}
	);
	Collection.associate = function (models) {
		Collection.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});

		Collection.hasMany(models.ArtPoem, {
			foreignKey: {allowNull: false},
		});
	};
	return Collection;
};
