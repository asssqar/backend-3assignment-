const mongoose = require('mongoose')

// схема книги
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    },
    genre: {
      type: String,
      default: 'unknown'
    }
  },
  {
    timestamps: true // mongoose сам создаёт createdAt и updatedAt
  }
)

module.exports = mongoose.model('Book', bookSchema)
