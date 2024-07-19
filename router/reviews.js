const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require('../models/listings.js');
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/reviews.js");
const {isLoggedIn,isOwner,validateReview,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../contollers/reviews.js");

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//deleting the review
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview))
module.exports=router;