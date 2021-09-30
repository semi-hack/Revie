import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
    },

    video: {
        type: String,
    },

    images: {
        type: Array,
    },
    date: {
        type: Date
    },

    helpful: {
        type: Number
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},

});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;