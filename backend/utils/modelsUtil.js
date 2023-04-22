const getAllClips = async (models) => {
	try {
		const clips = await models.Clip.findAll({
			include: [
				{
					model: models.User,
					as: "owner",
					attributes: ["username", "cognitoID"],
				},
			],
			attributes: ["id", "s3url", "title", "description"],
			raw: true,
		});
		return clips;
	} catch (err) {
		console.error(err);
	}
};

const getAllUser = async (models) => {
	try {
		const users = await models.User.findAll({
			attributes: ["username", "bio", "cognitoID"],
			raw: true,
		});
		return users;
	} catch (err) {
		console.error(err);
	}
};

const createUser = async (models, username, bio, cognitoID) => {
	try {
		const newUser = await models.User.create({
			username: username,
			bio: bio,
			cognitoID: cognitoID,
		});
	} catch (err) {
		console.error(err);
	}
};

const createClip = async (models, s3url, title, description, ownerID) => {
	try {
		const newClip = await models.Clip.create({
			s3url: s3url,
			title: title,
			description: description,
			ownerID: ownerID,
		});
	} catch (err) {
		console.error(err);
	}
};

// delete clip base on the clip id if the owner id matches
const deleteClip = async (models, clipID, ownerID) => {
	const clip = await models.Clip.findOne({
		where: { id: clipID, ownerID: ownerID },
	});
	if (!clip) {
		throw new Error("Clip not found");
	}
	const tempClip = clip;
	await clip.destroy();
	return tempClip;
};

// get a specific clip base on the clip id
const getClip = async (models, clipID) => {
	try {
		const clip = await models.Clip.findOne({
			where: { id: clipID },
			raw: true,
			include: [
				{
					model: models.User,
					as: "owner",
					attributes: ["username", "cognitoID"],
				},
			],
			attributes: ["id", "s3url", "title", "description", "createdAt"],
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
			where: { cognitoID: userID },
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

export {
	getAllClips,
	createUser,
	createClip,
	deleteClip,
	getClip,
	getUser,
	getUserOwnedClips,
	getAllUser,
};
