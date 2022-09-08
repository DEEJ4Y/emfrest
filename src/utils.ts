import { Server } from "http";
import mongoose from "mongoose";

/**
 * @namespace utils
 *
 * @description Utility functions to code faster.
 */

/**
 * @memberof utils
 *
 * @example
 * const { ErrorResponse } = require("emfrest/utils")
 *
 * @example <caption>Usage</caption>
 * error = new ErrorResponse(message, statusCode);
 *
 * @description Class to add a message and status code to the error object.
 */
export class ErrorResponse extends Error {
  statusCode: number;

  /**
   * @param {string} message Message to be added to the error object.
   * @param {number} statusCode HTTP Status code to be added to the error object
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @memberof utils
 *
 * @example
 * const { connectDB } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * connectDB(MONGODB_URI)
 *
 * @description Connect to a Mongodb database.
 *
 * @param {string} uri MongoDB connection string/URI
 */
export const connectDB = async (uri: string) => {
  console.log("Connecting to MongoDB...");
  const conn = await mongoose.connect(uri);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

/**
 * @memberof utils
 *
 * @example
 * const { handlePromiseRejections } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * handlePromiseRejections(server)
 *
 * @description Function to handle promise rejections.
 *
 * @param {Http2Server} server Server instance returned by the Express app.listen() method.
 */
export const handlePromiseRejections = (server: Server) => {
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);

    // Close server and exit
    server.close(() => {
      process.exit(1);
    });
  });
};
