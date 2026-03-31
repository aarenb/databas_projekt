/**
 * Category routes.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import express from 'express'
import { CategoryController } from '../controllers/category-controller.js'

export const router = express.Router()

const controller = new CategoryController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', (req, res, next) => controller.addView(req, res, next))
router.post('/create', (req, res, next) => controller.createCategory(req, res, next))

router.get('/:id', (req, res, next) => controller.showCategory(req, res, next))