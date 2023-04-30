import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import db from "../../models/index.js";
import {
	getAllClips,
	getClip,
	getUser,
	getUserOwnedClips,
	createClip,
	deleteClip,
	getAllUser
} from "../../utils/modelsUtil.js";

const bucketName = process.env.BUCKET_NAME;

const upload = multer();
const router = express.Router();
const s3 = new AWS.S3();

console.log(await getAllUser(db));
// console.log(await getAllClips(db));

// GET 		/resources/clips/get 				returns a list of json objects with s3url, title, description, and owner, owner consist of username, bio
// GET 		/resources/clips/get/:id 			returns a single json object with s3url, title, description, and owner, owner consist of username, bio
// POST 	/resources/clips/upload 			accepts a file and create s3url, title, description, and ownerID into database
// DELETE 	/resources/clips/delete/:id 		deletes a single clip
// GET 		/resources/clips/user/:userid 			return user info
// GET 		/resources/clips/user/:userid/clips 	return user's clips

router.get("/", (req, res, next) => {
	res.send("clips module online");
});

router.get("/get", async (req, res, next) => {
	try {
		const clips = await getAllClips(db);

		// Generate a signed URL for each clip
		const signedClips = await Promise.all(
			clips.map(async (clip) => {
				const url = await s3.getSignedUrlPromise("getObject", {
					Bucket: bucketName,
					Key: clip.s3url.split("/").slice(-1)[0],
					Expires: parseInt(process.env.S3_URL_EXPIRATION),
				});
				return { ...clip, s3url: url };
			})
		);

		res.json(signedClips);
	} catch (err) {
		next(err);
	}
});

router.get("/get/:id", async (req, res, next) => {
	try {
		const clip = await getClip(db, req.params.id);
		if (!clip) {
			return res.status(404).send("Clip not found");
		}
		const url = s3.getSignedUrl("getObject", {
			Bucket: bucketName,
			Key: clip.s3url,
			Expires: process.env.S3_URL_EXPIRATION,
		});
		clip.s3url = url;
		res.json(clip);
	} catch (err) {
		next(err);
	}
});

router.post(
	"/upload",
	upload.single("file"),
	async (req, res, next) => {
		console.log("starting the upload process")
		const userInfo = await db.User.findOne({
			where: { username: req.body.username },
		});
		if (userInfo == null) {
			return res.status(404).send("User not found");
		}

		try {
			const params = {
				Bucket: bucketName,
				Key: req.file.originalname,
				Body: req.file.buffer,
			};
			const result = await s3.upload(params).promise();
			console.log(result.Location)
			// Create clip in database
			await createClip(
				db,
				result.Location,
				req.body.title,
				req.body.description,
				req.body.userID
			);

			res.send(result);
		} catch (err) {
			next(err);
		}
	}
);

router.delete("/delete/:clipid", async (req, res, next) => {
	try {
		const clip = await getClip(db, req.params.clipid);
		await deleteClip(db, req.params.clipid, req.body.userID);
		const key = clip.s3url.split("/").pop(); // Extract the key name from the S3 URL
		await s3.deleteObject({ Bucket: bucketName, Key: key }).promise(); // Delete the object from S3
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});


export { router as clipsModule };
