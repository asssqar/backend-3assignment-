const express = require('express')
const router = express.Router()

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController')


const reviewRouter = require('./reviews');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Re-route into other resource routers
router.use('/:bookId/reviews', reviewRouter);

router.post('/', protect, authorize('admin'), createBook)

router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.put('/:id', protect, authorize('admin'), updateBook)

router.delete('/:id', protect, authorize('admin'), deleteBook)

module.exports = router
