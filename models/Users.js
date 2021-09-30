import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    username: {
        required: true,
        type: String,
        unique: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    review: [{
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    }]
});

UserSchema.pre('save', async function save(next) {
    //if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
}


const User = mongoose.model("users", UserSchema);

export default User;