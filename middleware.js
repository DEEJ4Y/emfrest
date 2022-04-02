const { ErrorResponse } = require("./utils");

/**
 * @description Wrapper for any async middleware functions.
 *
 * @param {function} fn Async middleware function to be wrapped.
 *
 * @param {express.request} req Express request object.
 * @param {express.response} res Express response object.
 * @param {express.next} next Express next object.
 *
 * @returns {object} A resolved promise or an error.
 */
exports.asyncMiddlewareHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @description Wrapper for any async functions.
 *
 * @param {function} fn Async function to be wrapped.
 *
 * @param {any} a First param of fn.
 * @param {any} b Second param of fn.
 * @param {any} c Third param of fn.
 * @param {any} d Fourth param of fn.
 * @param {any} e Fifth param of fn.
 *
 * @returns {object} A resolved promise or an error.
 */
exports.asyncHandler = (fn) => async (a, b, c, d, e) => {
  try {
    return await fn(a, b, c, d, e);
  } catch (err) {
    return err;
  }
};

/**
 * @description Function to send a response with an error.
 *
 * @param {object} err Error object.
 * @param {express.request} req Express request object.
 * @param {express.response} res Express response object.
 * @param {express.next} next Express next function.
 */
exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };

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
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

/**
 * @description Function to send a successful response.
 *
 * @param {express.response} res Express response object.
 * @param {number} statusCode Http status code for the response.
 * @param {string} message Message for the response body.
 * @param {any} data Any data to send with the reponse.
 */
exports.successfulResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

/**
 * @description Middleware function to add model and modelName to the request object.
 *
 * @param {mongoose.model} model Mongoose model.
 * @param {string} modelName Model name (singular).
 *
 * @returns {function} An express middleware function
 */
exports.appendModelData = (model, modelName) => (req, res, next) => {
  req.emfrest_model = model;
  req.emfrest_modelName = modelName;

  next();
};
