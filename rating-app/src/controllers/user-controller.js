/**
 * User controller.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import { User } from '../models/user.js'

export class UserController {
  /**
   * Returns a HTML form for creating a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    const viewData = {
      loggedIn: req.session.user
    }

    res.render('register/index', { viewData })
  }

  /**
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async registerUser (req, res) {
    console.log(req.body)
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'The user was created successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./register')
    }
  }

  /**
   * If username and password is correct, login the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        req.session.user = user
        res.redirect('..')
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Incorrect username or password.' }
      res.redirect('..')
    }
  }

  /**
   * Logout the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    try {
      if (!req.session.user) {
        res.status(404).send('Not found')
      }
      req.session.destroy()
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }
}
