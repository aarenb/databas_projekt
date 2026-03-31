/**
 * Item controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { Item } from '../models/item.js'
import { Category } from '../models/category.js'
import { Rating } from '../models/rating.js'

export class ItemController {
  /**
   * Gets all items from DB and renders a view with them
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        items: (await Item.find())
          .map(item => item.toObject())
      }

      res.render('item/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

   /**
   * Returns a HTML form for creating a new item.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async addView (req, res) {
    const viewData = {
      loggedIn: req.session.user,
      categories: (await Category.find())
                .map(category => category.toObject())
    }

    res.render('item/add', { viewData })
  }

  /**
     * Gets a certain item and all ratings of it, and renders a view
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async showItem (req, res, next) {
      try {
        const item = (await Item.findById(req.params.id)).toObject()

        const ratings = await Rating.find({}).populate({
          path: 'item',
          match: {name: { $eq: item.name}},
        })

        const filteredRatings = ratings.filter(
          rating => rating.item !== null
        )
  
        const viewData = {
          item,
          ratings: filteredRatings
        }
  
        res.render('item/one', { viewData })
      } catch (error) {
        next(error)
      }
    }

  /**
       * Creates a new item.
       *
       * @param {object} req - Express request object.
       * @param {object} res - Express response object.
       */
      async createItem (req, res) {
        try {
          let brand = req.body.brand
          if (!brand) {
            brand = 'None'
          }

          const item = new Item({
            name: req.body.name,
            description: req.body.description,
            creator: req.session.user._id,
            brand,
            imgUrl: req.body.imgUrl,
            category: req.body.category
          })
    
          await item.save()
    
          req.session.flash = { type: 'success', text: 'The item was created successfully.' }
          res.redirect('..')
        } catch (error) {
          req.session.flash = { type: 'danger', text: error.message }
          res.redirect('..')
        }
      }
}