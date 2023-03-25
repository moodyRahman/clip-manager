import express from 'express'
import { clipsModule } from './clips.js'

const router = express.Router()

router.use("/clips", clipsModule)

export { router as resourceModule }