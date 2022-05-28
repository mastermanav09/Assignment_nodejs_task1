const router = require("express").Router();
const reviewControllers = require("../controllers/review");

router.post("/add", reviewControllers.addReview);
router.delete("/:reviewId/delete", reviewControllers.deleteReview);
router.get("/:productId/getReviews", reviewControllers.getReviews);

module.exports = router;
