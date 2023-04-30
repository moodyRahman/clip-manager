import express from 'express'
import { clipsModule } from './clips.js'
import { homeModule } from "./home.js"
import { usersModule } from './users.js'

const router = express.Router()

router.use("/clips", clipsModule)
router.use("/home", homeModule)
router.use("/users", usersModule)

export { router as resourceModule }
