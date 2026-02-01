const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews
// @route   GET /api/reviews
// @route   GET /api/books/:bookId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        let query;

        if (req.params.bookId) {
            query = Review.find({ book: req.params.bookId });
        } else {
            query = Review.find().populate({
                path: 'book',
                select: 'title author'
            });
        }

        const reviews = await query;

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate({
            path: 'book',
            select: 'title description'
        });

        if (!review) {
            return res.status(404).json({ success: false, error: 'No review found' });
        }

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add review
// @route   POST /api/books/:bookId/reviews
// @access  Private
exports.addReview = async (req, res) => {
    try {
        req.body.book = req.params.bookId;
        req.body.user = req.user.id;

        const book = await Book.findById(req.params.bookId);

        if (!book) {
            return res.status(404).json({ success: false, error: 'No book found' });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, error: 'No review found' });
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to update review' });
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, error: 'No review found' });
        }

        // Make sure review belongs to user or user is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to delete review' });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
