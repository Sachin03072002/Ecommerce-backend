const express = require("express");
const router = express.Router();

const reviewAndRatingController = require("../controller/ratingController");
const authenticate = require("../middleware/authenticate");

// For creating reviews or ratings
router.post("/create", authenticate, reviewAndRatingController.createReviewOrRating);

// For getting all reviews or ratings for a specific product
router.get("/product/:productId", authenticate, reviewAndRatingController.getAllReviewOrRating);

module.exports = router;
