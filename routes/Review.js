import express from 'express';
import Review from '../controllers/Review.js';
const router = express.Router();

router.post('/Review', Review.addReview);
router.get('/AllReview', Review.getAllReviews);
router.get('/singleReview', Review.getSingleReview);
router.get('/recentReview', Review.getRecentReview);
router.get('/helpfulReview', Review.getHelpfulReview);
router.patch('/Review', Review.editReview);

export default router