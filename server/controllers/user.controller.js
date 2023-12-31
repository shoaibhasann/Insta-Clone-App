import User from "../models/user.model.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};

// to register user
const userSignup = async (req, res, next) => {
  try {
    const { name, username, email, password, bio } = req.body;

    // Check if a user with the provided email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create a new user in the database
    const user = await User.create({
      name,
      username,
      email,
      password,
      bio,
    });

    // Set the password field to undefined to hide it in the response
    user.password = undefined;

    // Generate a new token for the user
    const token = await user.generateToken();

    // Set the token as a cookie in the response
    res.cookie("token", token, cookieOptions);

    // Send a success response with the registered user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    // Handle any errors that occurred during user registration or processing
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// to login user
const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const getUserData = await User.findOne({ username }).select("+password");
    if (getUserData && getUserData.username) {
      const result = await getUserData.comparePassword(
        password,
        getUserData.password
      );
      if (result) {
        const token = await getUserData.generateToken();
        res.cookie("token", token, cookieOptions);

        // Send a successful response with the user data
        res.status(200).json({
          success: true,
          data: getUserData,
        });
      } else {
        res.status(401).json({ message: "Password is incorrect, try again!" });
      }
    } else {
      res
        .status(401)
        .json({ message: "No account associated with this username" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get user details
const getUserDetails = async (req, res, next) => {
  try {
    // Destructure id and username from the req.user object (set by authenticateUser middleware)
    const { id, username } = req.user;

    // Find the user in the database based on the username
    const userData = await User.findOne({ username });

    // If the user is not found, send an error response
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // If the user is found, send a success response with the user data
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    // Handle any errors that occurred during the database query or processing
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


export {
    userSignup,
    userLogin,
    getUserDetails
}