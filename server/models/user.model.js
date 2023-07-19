import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [5, "Name must have at least 5 characters"],
    maxLength: [30, "Name should be less than 30 characters"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  bio: {
    type: String,
    required: [true, "Bio is required"],
    minLength: [15, "Bio must be at least 15 characters"],
    maxLength: [80, "Bio should be less than 80 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
});

// Pre-save hook to hash and salt the password
userSchema.pre("save", async function (next) {
  try {

    if(!this.isModified('password')){
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    // Set the hashed password as the user's password
    this.password = hashedPassword;
    return next();
  } catch (error) {
    next(error);
  }
});

// Methods in user schema

/**
 * Generate a JWT token for the user.
 * @returns {string} - The generated JWT token.
 */
userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/**
 * Compare a password with the user's hashed password.
 * @param {string} notHashedPassword - The plain text password to compare.
 * @returns {boolean} - True if the password matches, false otherwise.
 */
userSchema.methods.comparePassword = async function (notHashedPassword) {
  return await bcrypt.compare(notHashedPassword, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
