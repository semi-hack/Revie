import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    landlord: {
        type: String,
    },
    location: {
        type: String,
    },
    quality: {
        type: String,
    },
    video: {
        type: String,
    },
    images: {
        type: [String],
    },
    date: {
        type: Date
    },
    helpful: {
        type: Number,
        default: 0
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},

});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;