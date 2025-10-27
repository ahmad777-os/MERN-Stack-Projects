import express from "express";
import {
    getReviews,
    getReviewsByRestaurant,
    addReview,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/restaurant/:restaurantId", getReviewsByRestaurant);
router.post("/", addReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
