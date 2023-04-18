import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import MongoDb from "mongodb";


const upload = multer();
const router = express.Router();
const s3 = new AWS.S3();
const bucketName = "clip-manager-video-clips";
const MongoClient = MongoDb.MongoClient;

const uri = "mongodb://clips-user:clips-password@44.203.146.149:27017/clipsdb";

async function main() {
	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		// Make the appropriate DB calls
		const db = client.db("clipsdb");
		const collection = db.collection("clips");

		const docs = await collection.find({}).toArray();
		console.log("Found the following documents:");
		console.log(docs);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

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
