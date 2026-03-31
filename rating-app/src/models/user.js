/**
 * Mongoose model User.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

// TODO: Add nicer looking error message for if username or email already exists
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'The password must be of minimum length 6 characters.']
  },
  nickname: {
    type: String,
    maxlength: 20,
    required: true
  },
  bio: {
    type: String,
    maxlength: 150,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [ validator.isEmail, 'invalid email' ]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    }
  }
})

// Hash password before saving it in the database
schema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

/**
 * Checks if username and password are correct, if so returns the user.
 *
 * @param {string} username The input for username.
 * @param {string} password The input for password.
 * @returns {User} The user.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const User = mongoose.model('User', schema)
