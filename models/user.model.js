import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }, 
    avatar: {
        type: String
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;