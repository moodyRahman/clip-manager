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

const router = express.Router();
const bucketName = process.env.BUCKET_NAME;
const s3 = new AWS.S3();

router.get("/:userid", async (req, res, next) => {
    try {
        const user = await getUser(db, req.params.userid);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get("/:userid/clips", async (req, res, next) => {
    try {
        const clips = await getUserOwnedClips(db, req.params.userid);


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

router.delete("/delete_username", async (req, res, next) => {
    const deleteUser = async (models, username) => {
        const user = await models.User.findOne({
            where: { username: username },
        });
        if (!user) {
            throw new Error("User not found");
        }
        await user.destroy();
    };

    const { username } = req.body

    await deleteUser(db, username);

    res.send("done")
})



export { router as usersModule };
