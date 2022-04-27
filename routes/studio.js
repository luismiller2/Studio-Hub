var express = require('express');
var router = express.Router();
const Studio = require('../models/Studio.models')
const Review = require('../models/Review.models')
const isLoggedIn = require('../middleware/isLoggedIn');

//This route returns all studios
router.get("/", function (req, res, next) {
    Studio.find()
      .then(function (results) {
        console.log("Success!", results);
        res.render("studio", { studio: results });
  
      })
      .catch(function (err) {
        console.log("Something went wrong", err.message);
      });
    // res.render("studio");
  });
  
  
  //This route creates a review for a studio
  router.get("/review/:id", function (req, res, next) {
    Studio.findById(req.params.id)
      .then(function (results) {
        console.log("Success!", results);
        res.render("review", { review: results });
  
      })
      .catch(function (err) {
        console.log("Something went wrong", err.message);
      });
    // res.render("studio");
  });

  router.post("/review/:studioId", function(req, res, next){
    Review.create({
      user: req.session.user._id,
      studio: req.params.studioId,
      review: req.body.review,
    })
    .then(function (createdReview) {  
      Studio.findByIdAndUpdate(req.params.studioId, {
        $addToSet: {reviews: createdReview._id}
      })
        .then(function(foundStudio){
          res.render("studio-review", {createdReview: createdReview, foundStudio: foundStudio, user: req.session.user.name})
        }) .catch(function(err){
          console.log(err.message)
        })
  
    })
    .catch(function (error) {
      res.json(error.message);
    });
  });
  


  //This route returns all of the reviews for a specific studio
 
router.get("/all-reviews", (req, res) => {
  Studio.find()
    .populate({
      path: "reviews",
    })
    .then((allStudios) => {
      res.render("all-reviews", { allStudios: allStudios });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

module.exports = router;