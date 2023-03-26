import express from 'express'
import { verifyJSONBody } from '../middleware.js';
const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("auth module online")
})

router.post("/login", (req, res, next) => {
    res.send("backend endpoint for logins")
})

router.post("/signup", (req, res, next) => {
    res.send("backend endpoint for signups")
})


export { router as authModule }
