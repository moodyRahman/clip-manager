import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
	class Clip extends Model {}

	Clip.init(
		{
			title: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.STRING, allowNull: true },
			s3url: { type: DataTypes.STRING, allowNull: false },
			ownerID: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: "Clip",
		}
	);

	Clip.associate = (models) => {
		Clip.belongsTo(models.User, {
			foreignKey: "ownerID",
			targetKey: "cognitoID",
			as: "owner",
		});
	};

	return Clip;
};
