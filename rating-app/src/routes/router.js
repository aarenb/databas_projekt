/**
 * The routes.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

const controller = new HomeController()

router.use('/user', userRouter)

router.get('/', (req, res, next) => controller.index(req, res, next))
