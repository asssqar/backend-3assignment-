const Book = require('../models/Book')
const mongoose = require('mongoose')

// создать книгу
const createBook = async (req, res, next) => {
  try {
    const { title, author, year, genre } = req.body

    // простая валидация
    if (!title || !author || !year) {
      return res.status(400).json({ message: 'required fields missing' })
    }

    const book = await Book.create({
      title,
      author,
      year,
      genre
    })

    res.status(201).json(book)
  } catch (error) {
    next(error)
  }
}

// получить все книги
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    next(error)
  }
}

// получить книгу по id
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params

    // проверяем валидный ли id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'invalid book id' })
    }

    const book = await Book.findById(id)

    if (!book) {
      return res.status(404).json({ message: 'book not found' })
    }

    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}

// обновить книгу
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'invalid book id' })
    }

    const book = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!book) {
      return res.status(404).json({ message: 'book not found' })
    }

    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}

// удалить книгу
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'invalid book id' })
    }

    const book = await Book.findByIdAndDelete(id)

    if (!book) {
      return res.status(404).json({ message: 'book not found' })
    }

    res.status(200).json({ message: 'book deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
}
