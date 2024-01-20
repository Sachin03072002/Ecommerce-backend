const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

async function createReviewOrRating(reqData, user) {
    const product = await productService.findProductById(reqData.product);


    // If it's a review
    const review = new Rating({
        user: user._id,
        product: product._id,
        rating: reqData.rating,
        review: reqData.review,
        createdAt: new Date(),
    });
    product.ratings.push(review)
    await product.save();
    await review.save();

    console.log("rating:", reqData);
    return "Review or Rating created successfully"; // Adjust this return statement as needed
}

async function getAllReviewOrRating(productId) {
    const product = await productService.findProductById(productId);


    const ratings = await Rating.find({ product: productId }).populate("user");

    return { ratings };
}


module.exports = {
    createReviewOrRating,
    getAllReviewOrRating,
};
