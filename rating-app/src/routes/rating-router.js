/**
 * Rating routes.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import express from 'express'
import { RatingController } from '../controllers/rating-controller.js'

export const router = express.Router()

const controller = new RatingController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', (req, res, next) => controller.addView(req, res, next))
router.post('/create', (req, res, next) => controller.createRating(req, res, next))

router.get('/:id', (req, res, next) => controller.showRating(req, res, next))

router.get('/:id/update', (req, res, next) => controller.authorizeOwner(req, res, next), (req, res, next) => controller.editView(req, res, next))
router.post('/:id/update', (req, res, next) => controller.authorizeOwner(req, res, next), (req, res, next) => controller.updateRating(req, res, next))

router.get('/:id/delete', (req, res, next) => controller.authorizeOwner(req, res, next), (req, res, next) => controller.deleteConfirmation(req, res, next))
router.post('/:id/delete', (req, res, next) => controller.authorizeOwner(req, res, next), (req, res, next) => controller.deleteRating(req, res, next))
