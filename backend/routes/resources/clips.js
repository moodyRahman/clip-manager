import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import db from "../../models/index.js";
import {
	getAllUsers,
	getAllClips,
	getClip,
	getUser,
	getUserOwnedClips,
	createClip,
	deleteClip,
	createUser
} from "../../utils/modelsUtil.js";


import passport from "../../middlewares/authentication.js"
const bucketName = process.env.BUCKET_NAME;

const upload = multer();
const router = express.Router();
const s3 = new AWS.S3();

// console.log(await getAllUsers(db));
// createUser(db, "donaldduck", "Quack quack!", "4c7170c2-0ffe-4071-a4dc-4ab7e31da514");

// GET /resources/clips/get 			returns a list of json objects with s3url, title, description, and owner, owner consist of username, bio
// GET /resources/clips/get/:id 		returns a single json object with s3url, title, description, and owner, owner consist of username, bio
// POST /resources/clips/upload 		accepts a file and create s3url, title, description, and ownerID into database
// DELETE /resources/clips/delete/:id 	deletes a single clip
// PUT /resources/clips/update/:id 		updates a single clip json file with s3url, title, description
// GET /resources/clips/search/:query 	returns a list of json objects with s3url, title, description, and owner, owner consist of username, bio from search query as title
// PUT /resources/update/setting 		updates a user's bio

router.get("/", (req, res, next) => {
	res.send("clips module online");
});

router.get("/get", async (req, res, next) => {
	try {
		const objects = await s3.listObjects({ Bucket: bucketName }).promise();
		const objectKeys = objects.Contents.map((obj) => {
			const url = s3.getSignedUrl("getObject", {
				Bucket: bucketName,
				Key: obj.Key,
			});
			return url;
		});
		res.send(objectKeys);
	} catch (err) {
		next(err);
	}
});

router.get("/get/:id", (req, res, next) => {
	res.send(`looking for video ${req.params.id}?`);
});

router.post("/upload", passport.isAuthenticated(), upload.single("file"), async (req, res, next) => {
	try {
		const params = {
			Bucket: bucketName,
			Key: req.file.originalname,
			Body: req.file.buffer,
		};
		const result = await s3.upload(params).promise();

		res.send(result);
	} catch (err) {
		next(err);
	}
});

router.delete(
	"/delete/:id",
	passport.isAuthenticated(),
	(req, res, next) => {
		res.json({
			message: "You are authorized to delete",
			user: req.user,
		});
	}
);

export { router as clipsModule };
