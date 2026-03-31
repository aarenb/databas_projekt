/**
 * Rating controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { Item } from '../models/item.js'
import { Rating } from '../models/rating.js'
import { User } from '../models/user.js'

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
          rating: (await Rating.findById(req.params.id)).toObject(),
          loggedIn: req.session.user
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

  /**
     * Returns a page with the rating's edit profile form.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    async editView (req, res) {
      const viewData = {
        loggedIn: req.session.user,
        rating: (await Rating.findById(req.params.id)).toObject()
      }
  
      res.render('rating/edit', { viewData })
    }

    /**
     * Updates a rating.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    async updateRating (req, res) {
      try {
        const rating = await Rating.findById(req.params.id)
  
        if (rating) {
          // TODO: this is shitty code quality lol
          if (req.body.title != rating.title) {
            rating.title = req.body.title
          }
          if (req.body.stars != rating.stars) {
            rating.stars = req.body.stars
          }
          if (req.body.description != rating.description) {
            rating.description = req.body.description
          }
  
          await rating.save()
  
          req.session.flash = { type: 'success', text: 'The rating was updated successfully.' }
        } else {
          req.session.flash = {
            type: 'danger',
            text: 'Failed updating rating'
          }
        }
        res.redirect('..')
      } catch (error) {
        req.session.flash = { type: 'danger', text: error.message }
        res.redirect('./update')
      }
    }

    /**
   * Returns a HTML form for confirming deleting a rating.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deleteConfirmation (req, res) {
    try {
      const rating = await Rating.findById(req.params.id)

      res.render('rating/delete', { viewData: rating.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified rating.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deleteRating (req, res) {
    try {
      await Rating.findByIdAndDelete(req.params.id)

      req.session.flash = { type: 'success', text: 'The rating was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }

    /**
   * Checks if user is logged in and owns rating.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {Error} 404 if user isn't logged in, 403 if user doesn't own snippet.
   */
  async authorizeOwner (req, res, next) {
    if (!req.session.user) {
      res.status(404).send('Not found')
    } else {
      const rating = await Rating.findById(req.params.id)

      if (req.session.user.username !== rating.creator) {
        res.status(403).send('Forbidden')
      }
    }
    next()
  }
}