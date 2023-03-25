import express from 'express'
const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("clips module online")
})

router.post("/get", (req, res, next) => {
    res.send("get all videos")
})

router.post("/get/:id", (req, res, next) => {
    res.send(`looking for video ${req.params.id}?`)
})

router.post("/create", (req, res, next) => {
    res.send("creating video")
})

router.delete("/deleting video", (req, res, next) => {
    res.send("deleting video")
})

export { router as clipsModule }
