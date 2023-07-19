import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate the user before accessing sensitive routes.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON response indicating success or failure.
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Check if the token is present in the cookies
    const token = req.cookies?.token || null;

    // If the token is missing, send an error response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed: Token missing.",
      });
    }

    try {
      // Verify the token and extract the payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's id and username from the token payload to the request object
      req.user = { id: payload.id, username: payload.username };

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If the token is invalid, send an error response
      return res.status(401).json({
        success: false,
        message: "User authentication failed: Invalid token.",
      });
    }
  } catch (error) {
    // Handle other errors, if any
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default authenticateUser;
