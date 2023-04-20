import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            username: { type: DataTypes.STRING, allowNull: false },
            bio: { type: DataTypes.STRING, allowNull: true },
            cognitoID: { type: DataTypes.STRING, allowNull: false }
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
}