import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) { 
    if(!this.isModified('password')) { 
        console.log('Password is Not Hashed');
        next(); 
    }
    console.log('Password is Hashed');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model("User", userSchema, "Users");

export default User;