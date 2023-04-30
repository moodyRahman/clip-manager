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
        res.json(clips);
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
