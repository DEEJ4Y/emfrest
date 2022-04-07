const mongoose = require("mongoose");

/**
 * @example
 * const { ErrorResponse } = require("emfrest/utils")
 *
 * error = new ErrorResponse(message, statusCode);
 *
 * @description Class to add a message and status code to the error object.
 */
exports.ErrorResponse = class ErrorResponse extends Error {
  /**
   * @param {string} message Message to be added to the error object.
   * @param {number} statusCode HTTP Status code to be added to the error object
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * @example
 * const { connectDB } = require("emfrest")
 *
 * connectDB(MONGODB_URI)
 *
 * @description Connect to a Mongodb database.
 *
 * @param {string} uri MongoDB connection string/URI
 */
exports.connectDB = async (uri) => {
  console.log("Connecting to MongoDB...");
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

/**
 * @example
 * const { handlePromiseRejections } = require("emfrest")
 *
 * handlePromiseRejections(server)
 *
 * @description Function to handle promise rejections.
 *
 * @param {express.app} server Instance of the active express app.
 */
exports.handlePromiseRejections = (server) => {
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);

    // Close server and exit
    server.close(() => {
      process.exit(1);
    });
  });
};
