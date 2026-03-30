/**
 * Mongoose model Item.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  category: { // TODO: add validation
    type: String,
    required: true
  },
  creator: { // TODO: add validation
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 250
  },
  imgUrl: { // TODO: add validation
    type: String
  },
  brand: {
    type: String
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

export const Item = mongoose.model('Item', schema)
