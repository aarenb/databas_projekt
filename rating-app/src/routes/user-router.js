/**
 * User routes.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => controller.registerUser(req, res, next))

router.post('/login', (req, res, next) => controller.login(req, res, next))
router.get('/logout', (req, res, next) => controller.logout(req, res, next))

router.get('/profile', (req, res, next) => controller.showProfile(req, res, next))

router.get('/update', (req, res, next) => controller.editView(req, res, next))
router.post('/update', (req, res, next) => controller.updateUser(req, res, next))
