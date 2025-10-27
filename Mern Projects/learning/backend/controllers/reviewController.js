import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user", "name email")
            .populate("restaurant", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId })
            .populate("user", "name email");
        if (!reviews || reviews.length === 0)
            return res.status(404).json({ message: "No reviews found for this restaurant" });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addReview = async (req, res) => {
    try {

        const { user, restaurant, rating, comment } = req.body;

        if (!user || !restaurant || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = await Review.create({ user, restaurant, rating, comment });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedReview)
            return res.status(404).json({ message: "Review not found" });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview)
            return res.status(404).json({ message: "Review not found" });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
