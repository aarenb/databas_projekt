/**
 * Category controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { Category } from '../models/category.js'
import { Item } from '../models/item.js'

export class CategoryController {
  /**
   * Gets all categories from DB and renders a view with them
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        categories: (await Category.find())
          .map(category => category.toObject())
      }

      res.render('category/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets a certain category and all items in it, and renders a view
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async showCategory (req, res, next) {
    try {
      const category = (await Category.findById(req.params.id)).toObject()
      const items = (await Item.find({'category.id': req.params.id})).map(item => item.toObject())

      console.log(category)
      const viewData = {
        category,
        items
      }

      res.render('category/one', { viewData })
    } catch (error) {
      next(error)
    }
  }

    /**
   * Returns a HTML form for creating a new category.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async addView (req, res) {
    const viewData = {
      loggedIn: req.session.user
    }

    res.render('category/add', { viewData })
  }

    /**
     * Creates a new category.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    async createCategory (req, res) {
      try {
        console.log(req.session.user)
        const category = new Category({
          name: req.body.name,
          description: req.body.description,
          creator: req.session.user._id
        })
  
        await category.save()
  
        req.session.flash = { type: 'success', text: 'The category was created successfully.' }
        res.redirect('..')
      } catch (error) {
        req.session.flash = { type: 'danger', text: error.message }
        res.redirect('..')
      }
    }
}
