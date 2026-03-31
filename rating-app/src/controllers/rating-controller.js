/**
 * Rating controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { Item } from '../models/item.js'
import { Rating } from '../models/rating.js'

export class RatingController {
  /**
   * Gets all ratings from DB and renders a view with them
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        ratings: (await Rating.find())
          .map(rating => rating.toObject())
      }

      res.render('rating/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

   /**
   * Returns a HTML form for creating a new rating.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async addView (req, res) {
    const viewData = {
      loggedIn: req.session.user,
      items: (await Item.find())
                .map(item => item.toObject())
    }

    res.render('rating/add', { viewData })
  }

  /**
     * Gets a certain rating, and renders a view
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async showRating (req, res, next) {
      try {
        const viewData = {
          rating: (await Rating.findById(req.params.id)).toObject()
        }
  
        res.render('rating/one', { viewData })
      } catch (error) {
        next(error)
      }
    }

  /**
       * Creates a new rating.
       *
       * @param {object} req - Express request object.
       * @param {object} res - Express response object.
       */
      async createRating (req, res) {
        try {
          const rating = new Rating({
            item: req.body.item,
            description: req.body.description,
            creator: req.session.user.username,
            stars: req.body.stars,
            title: req.body.title
          })
    
          await rating.save()
    
          req.session.flash = { type: 'success', text: 'The rating was created successfully.' }
          res.redirect('..')
        } catch (error) {
          req.session.flash = { type: 'danger', text: error.message }
          res.redirect('..')
        }
      }
}