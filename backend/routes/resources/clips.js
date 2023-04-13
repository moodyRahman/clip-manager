import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import MongoDb from "mongodb";

const upload = multer();
const router = express.Router();
const s3 = new AWS.S3();
const MongoClient = MongoDb.MongoClient;

const bucketName = "clip-manager-video-clips";

//Create a MongoDB client, open a connection to DocDB; as a replica set,
//  and specify the read preference as secondary preferred

MongoClient.connect(
	"mongodb://clipdbmanager:Aadocdb1243@docdb-clip-manager.cinjbaykl6cc.us-east-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false", {
	tlsCAFile: "rds-combined-ca-bundle.pem"
},

	function (err, client) {
		if (err) throw err;

		//Specify the database to be used
		console.log("Connected successfully to server");

		client.close();
	}
);

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
