import { config as configDotenv } from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";

// Load environment variables from .env file
configDotenv();

const port = process.env.PORT || 7000;

// Start the server
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});

