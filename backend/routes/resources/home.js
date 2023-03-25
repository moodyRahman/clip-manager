import express from 'express'
const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("homepage recommendor online")
})

router.post("/", (req, res, next) => {
    res.send("some recommendations for the user")
})

export { router as homeModule }
