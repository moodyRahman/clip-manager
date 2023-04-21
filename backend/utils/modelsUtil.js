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

const getAllClips = async (models) => {
	try {
		const clips = await models.Clip.findAll({
			include: [
				{
					model: models.User,
					as: "owner",
					attributes: ["username", "bio", "id"],
				},
			],
			attributes: ["id", "s3url", "title", "description", "ownerID"],
		});
		return clips;
	} catch (err) {
		console.error(err);
	}
};

const createUser = async (models, username, bio, cognitoId) => {
	try {
		const newUser = await models.User.create({
			username: username,
			bio: bio,
			cognitoId: cognitoId,
		});
		console.log(`User ${newUser.username} created with ID ${newUser.id}`);
	} catch (err) {
		console.error(err);
	}
};

// delete user base on username
// const deleteUser = async (models, username) => {
// 	try {
// 		const user = await models.User.findOne({ where: { username } });
// 		await user.destroy();
// 		console.log(`User ${username} deleted`);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

const createClip = async (models, s3url, title, description, ownerID) => {
	try {
		const newClip = await models.Clip.create({
			s3url: s3url,
			title: title,
			description: description,
			ownerID: ownerID,
		});
		console.log(`Clip ${newClip.title} created with ID ${newClip.id}`);
	} catch (err) {
		console.error(err);
	}
};

// delete clip base on the clip id if the owner id matches
const deleteClip = async (models, clipID, ownerID) => {
	try {
		const clip = await models.Clip.findOne({
			where: { id: clipID, ownerID: ownerID },
		});
		await clip.destroy();
		console.log(`Clip ${clip.title} deleted`);
	} catch (err) {
		console.error(err);
	}
};

// get a specific clip base on the clip id
const getClip = async (models, clipID) => {
	try {
		const clip = await models.Clip.findOne({
			where: { id: clipID },
		});
		return clip;
	} catch (err) {
		console.error(err);
	}
};

// get a specific user base on the user id
const getUser = async (models, userID) => {
	try {
		const user = await models.User.findOne({
			where: { id: userID },
		});
		return user;
	} catch (err) {
		console.error(err);
	}
};

// get all clips of a specific user base on the user id
const getUserOwnedClips = async (models, userID) => {
	try {
		const clips = await models.Clip.findAll({
			where: { ownerID: userID },
		});
		return clips;
	} catch (err) {
		console.error(err);
	}
};


export { getAllUsers, getAllClips, createUser, createClip, deleteClip, getClip, getUser, getUserOwnedClips };
