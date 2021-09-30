import express from "express";
import Review from "../models/Reviews.js";
import User from "../models/Users.js";


const addReview = async(req, res) => {
    const reviews = new Review({
        comment: req.body.comment,
        video: req.body.video,
        image: req.body.image,
        helpful: req.body.helpful,
        date: req.body.date,
        userId: req.body.userId

    })

    await reviews.save()

    try {
        const update = await User.findByIdAndUpdate(req.headers._id, {
            $push : {
                review: reviews
            }
        }, { new : true })

        if (!update) {
            return res.status(405).json({
                message: "error"
            })
        } else {
            return res.status(200).json({
                message: "new review"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }

}

const editReview = async(req, res) => {
    const { _id } = req.headers
    try {
        const existingReview = await Review.findOne({ _id: req.headers._id })
        if (!existingReview) {
          res.status(401).json({
            message: "doesn't exists",
          });
        } else {
          const editedReview = await Review.findByIdAndUpdate(req.headers._id, {$set: req.body}, { new: true });
          if (!editedReview) {
              res.status(400).json({
                  message: "failed to update"
              });
          } else {
              res.json({
                  success: true,
                  message: editedReview
              });
          }
      
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getSingleReview = async(req, res) => {
    try {
        const existingReview = await Review.findOne({ _id: req.headers._id })
        if (!existingReview) {
            return res.status(404).json({
                message: "review not found"
            })
        } else {
            return res.status(200).json({
                data: existingReview
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getAllReviews = async (req, res) => {
  const rev = await Review.find({})
  if (rev) {
    return res.status(200).json({
      message: "true",
      data: rev
    })
  } else {
    return res.status(404).json({
      error: "no review found",
    });
  }

}

const getHelpfulReview = async (req, res) => {
    try {
        const result = await Review.find().sort({ helpful: -1})
        if (!result) {
            return res.status(400).json({
                message: "bad request"
            })
        } else {
            return res.status(200).json({
                data: result
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getRecentReview = async (req, res) => {
    try {


    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

export default { addReview, editReview, getAllReviews, getSingleReview, getHelpfulReview, getRecentReview }