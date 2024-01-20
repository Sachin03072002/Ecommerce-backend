const reviewAndRatingService = require("../services/rating.service");

const createReviewOrRating = async (req, res) => {
    const user = req.user;
    try {
        const reviewOrRating = await reviewAndRatingService.createReviewOrRating(req.body, user);
        console.log("ratingBody:", req.body)
        return res.status(201).send(reviewOrRating);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllReviewOrRating = async (req, res) => {
    const productId = req.params.productId;
    try {
        const reviewsAndRatings = await reviewAndRatingService.getAllReviewOrRating(productId);
        return res.status(201).send(reviewsAndRatings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createReviewOrRating,
    getAllReviewOrRating
};
