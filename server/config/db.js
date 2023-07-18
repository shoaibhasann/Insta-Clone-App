import mongoose from "mongoose";

/**
 * Function to connect to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
  try {
    // Connect to the MongoDB database
    const connection =
      await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database connected successfully to host: ${connection.connection.host}`
    );
  } catch (error) {
    console.log("Error:", error);
  }
};

export default connectDatabase;
