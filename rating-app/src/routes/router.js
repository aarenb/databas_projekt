/**
 * The routes.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'
import { router as userRouter } from './user-router.js'
import { router as categoryRouter } from './category-router.js'

export const router = express.Router()

const controller = new HomeController()

router.use('/user', userRouter)
router.use('/category', categoryRouter)

router.get('/', (req, res, next) => controller.index(req, res, next))
