/**
 * Mongoose model Rating.
 *
 * @author Aaren Bertilsson <aaren.bertilsson1@student.ksgyf.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  item: { // TODO: add validation
    type: String,
    required: true,
  },
  creator: { // TODO: add validation
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 250
  },
  stars: { 
    type: Number,
    min: 1,
    max: 10,
    required: true
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

// Make it so you can get rating.id
schema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Rating = mongoose.model('Rating', schema)
