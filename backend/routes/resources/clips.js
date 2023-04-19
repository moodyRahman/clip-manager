import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

const bucketName = process.env.BUCKET_NAME;

const upload = multer();
const router = express.Router();
const s3 = new AWS.S3();

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

router.post("/upload", upload.single("file"), async (req, res, next) => {
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

router.delete("/delete", (req, res, next) => {
	res.send("deleting video");
});

export { router as clipsModule };
