/**
 * Item controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { Item } from '../models/item.js'
import { Category } from '../models/category.js'

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
            creator: req.session.user.username,
            brand,
            imgUrl: req.body.imgUrl
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