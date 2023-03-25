import express from 'express'
import { clipsModule } from './clips.js'
import { homeModule } from "./home.js"
const router = express.Router()

router.use("/clips", clipsModule)
router.use("/home", homeModule)

export { router as resourceModule }
