import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique:true,
    },
    email: {
        type: String,
        require: true,
        unique:true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
    },
}, {timestamps: true});

const User = mongoose.model('User',userSchema);
export default User;