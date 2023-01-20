"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendModelData = exports.successfulResponse = exports.errorHandler = exports.asyncHandler = exports.asyncMiddlewareHandler = void 0;
const utils_1 = require("./utils");
/**
 * @example
 * const { asyncMiddlewareHandler } = require("emfrest/middleware")
 *
 * const anAsyncFunction = asyncMiddlewareHandler((req, res, next) => {
 *    const data = await something()
 *
 *    next()
 * })
 *
 * @description Wrapper for any async middleware functions.
 *
 * @param {Function} fn Async express middleware function to be wrapped.
 *
 * @returns {Promise<any>} A resolved promise or an error.
 */
const asyncMiddlewareHandler = (fn) => {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncMiddlewareHandler = asyncMiddlewareHandler;
/**
 * @example
 * const { asyncHandler } = require("emfrest/middleware")
 *
 * @example <caption>Usage</caption>
 * const anAsyncFunction = asyncHandler((a, b, c, d, e, ...rest) => {
 *    const data = await something()
 *
 *    return datas
 * })
 *
 * @description Wrapper for any async functions. Handles the error
 *
 * @param {Function} fn Async function to be wrapped. This function can have any number of parameters.
 *
 * @returns {Promise<any>} A resolved promise or an error.
 */
function asyncHandler(fn) {
    return function (...params) {
        return Promise.resolve(fn(...params)).catch(params[2] ? params[2] : () => { });
    };
}
exports.asyncHandler = asyncHandler;
/**
 * @example
 * const { errorHandler } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * app.use(errorHandler);
 *
 * @description Function to send a response with an error.
 *
 * @param {Error} err Error object.
 * @param {Request} req Express request object.
 * @param {Response} res Express response object.
 * @param {Next} next Express next function.
 */
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log to console for dev
    console.log(err);
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found`;
        error = new utils_1.ErrorResponse(message, 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new utils_1.ErrorResponse(message, 400);
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new utils_1.ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};
exports.errorHandler = errorHandler;
/**
 * @example
 * const { successfulResponse } = require("emfrest/middleware")
 *
 * @example <caption>Usage</caption>
 * successfulResponse(
 *   res,
 *   200,
 *   `The documents were successfully found.`,
 *   data
 * );
 *
 * @description Function to send a successful response.
 *
 * @param {Response} res Express response object.
 * @param {number} statusCode Http status code for the response.
 * @param {string} message Message for the response body.
 * @param {any} data Any data to send with the reponse.
 */
const successfulResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
    });
};
exports.successfulResponse = successfulResponse;
/**
 * @example
 * const { appendModelData } = require("emfrest/middleware")
 *
 * @example <caption>Usage</caption>
 * router
 *  .route(`/:${modelName}Id`)
 *  .get(appendModelData(model, modelName), getOneByIdController)
 *  .put(appendModelData(model, modelName), updateOneByIdController)
 *  .delete(appendModelData(model, modelName), deleteOneByIdController);
 *
 * @description Middleware function to add model and modelName to the request object. Makes req.emfrest_model and req.emfrest_modelName accessible.
 *
 * @param {mongoose.model} model Mongoose model.
 * @param {string} modelName Model name (singular).
 *
 * @returns {function} An express middleware function
 */
const appendModelData = (model, modelName) => {
    return (req, res, next) => {
        req.emfrest_model = model;
        req.emfrest_modelName = modelName;
        next();
    };
};
exports.appendModelData = appendModelData;
