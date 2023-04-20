import Sequelize from "sequelize";

const getAllUsers = async (models) => {
	try {
		const users = await models.User.findAll({
			attributes: ["id", "username", "bio", "cognitoId"],
			raw: true,
		});
		return users;
	} catch (err) {
		console.error(err);
	}
};

const printAllClips = async (models) => {
	try {
		const clips = await models.Clip.findAll();
		console.log(clips);
	} catch (err) {
		console.error(err);
	}
};

const createUser = async (models, username, bio, cognitoId) => {
	try {
		const newUser = await models.User.create({ username: username,bio: bio, cognitoId: cognitoId });
		console.log(`User ${newUser.username} created with ID ${newUser.id}`);
	} catch (err) {
		console.error(err);
	}
};

// delete user base on username
const deleteUser = async (models, username) => {
	try {
		const user = await models.User.findOne({ where: { username } });
		await user.destroy();
		console.log(`User ${username} deleted`);
	} catch (err) {
		console.error(err);
	}
};


export {
	getAllUsers,
	printAllClips,
	createUser,
	deleteUser
};
