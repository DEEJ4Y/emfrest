"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePromiseRejections = exports.connectDB = exports.ErrorResponse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
class ErrorResponse extends Error {
    /**
     * @param {string} message Message to be added to the error object.
     * @param {number} statusCode HTTP Status code to be added to the error object
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorResponse = ErrorResponse;
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
const connectDB = async (uri) => {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose_1.default.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
exports.connectDB = connectDB;
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
const handlePromiseRejections = (server) => {
    process.on("unhandledRejection", (err, promise) => {
        console.log(`Error: ${err}`);
        // Close server and exit
        server.close(() => {
            process.exit(1);
        });
    });
};
exports.handlePromiseRejections = handlePromiseRejections;
