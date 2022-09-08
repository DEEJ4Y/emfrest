import { ErrorResponse } from "./utils";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

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
export const asyncMiddlewareHandler = (
  fn: Function
): ((req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * @example
 * const { asyncHandler } = require("emfrest/middleware")
 *
 * @example <caption>Usage</caption>
 * const anAsyncFunction = asyncHandler((a, b, c, d, e) => {
 *    const data = await something()
 *
 *    return data
 * })
 *
 * @description Wrapper for any async functions. Handles the error
 *
 * @param {Function} fn Async function to be wrapped. This function can have any number of parameters.
 *
 * @returns {Promise<any>} A resolved promise or an error.
 */
export const asyncHandler =
  (fn: Function): ((...rest: any) => Promise<any>) =>
  async (...rest) => {
    try {
      return await fn(...rest);
    } catch (err) {
      return err;
    }
  };

/**
 * @description Custom error interface with Mongoose and MongoDB error properties.
 */
export interface CustomError extends ErrorResponse {
  code: number; // From MongoDB
  errors: any[]; // From Mongoose
}

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
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message: string = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

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
export const successfulResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

/**
 * @description Custom interface after appending model data.
 */
export interface ModelRequest extends Request {
  emfrest_model: typeof mongoose.Model;
  emfrest_modelName: string;
}

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
export const appendModelData = (
  model: typeof mongoose.Model,
  modelName: string
): any => {
  return (req: ModelRequest, res: Response, next: NextFunction) => {
    req.emfrest_model = model;
    req.emfrest_modelName = modelName;

    next();
  };
};
