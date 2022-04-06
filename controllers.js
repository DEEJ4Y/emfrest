const { asyncMiddlewareHandler, successfulResponse } = require("./middleware");
const {
  getAllService,
  createResourceService,
  getOneByIdService,
  updateOneByIdService,
  deleteByIdService,
} = require("./services");
const { ErrorResponse } = require("./utils");

/**
 * @exports emfrest/controllers
 *
 * @description Request/Response handler function to get all of a resource.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.next} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
exports.getAllController = asyncMiddlewareHandler(async (req, res, next) => {
  const model = req.emfrest_model;
  const modelName = req.emfrest_modelName;

  const data = await getAllService(model, {});

  if (!data) {
    return next(
      new ErrorResponse(`There was an error fetching your ${modelName}s.`, 404)
    );
  }

  successfulResponse(
    res,
    200,
    `The ${modelName}s were successfully found.`,
    data
  );
});

/**
 * @exports emfrest/controllers
 *
 * @description Request/Response handler function to create a resource.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.next} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
exports.createResourceController = asyncMiddlewareHandler(
  async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const newDocumentData = req.body;

    const data = await createResourceService(model, newDocumentData);

    if (!data) {
      return next(
        new ErrorResponse(
          `There was an error fetching your ${modelName}s.`,
          404
        )
      );
    }

    successfulResponse(
      res,
      200,
      `The ${modelName}s were successfully created.`,
      data
    );
  }
);

/**
 * @exports emfrest/controllers
 *
 * @description Request/Response handler function to fetch a document by its MongoDB ObjectId.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.next} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
exports.getOneByIdController = asyncMiddlewareHandler(
  async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    const data = await getOneByIdService(model, resourceId);

    if (!data) {
      return next(
        new ErrorResponse(
          `There was an error fetching your ${modelName}. Check your ${modelName}Id.`,
          404
        )
      );
    }

    successfulResponse(
      res,
      200,
      `The ${modelName} was successfully found.`,
      data
    );
  }
);

/**
 * @exports emfrest/controllers
 *
 * @description Request/Response handler function to update a document by its MongoDB ObjectId.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.next} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
exports.updateOneByIdController = asyncMiddlewareHandler(
  async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    const newDocumentData = req.body;

    const data = await updateOneByIdService(model, resourceId, newDocumentData);

    if (!data) {
      return next(
        new ErrorResponse(
          `There was an error updating your ${modelName}. Check your ${modelName}Id.`,
          404
        )
      );
    }

    successfulResponse(
      res,
      200,
      `The ${modelName} was successfully updated.`,
      data
    );
  }
);

/**
 * @exports emfrest/controllers
 *
 * @description Request/Response handler function to delete a document by its MongoDB ObjectId.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {express.next} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
exports.deleteOneByIdController = asyncMiddlewareHandler(
  async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    await deleteByIdService(model, resourceId);

    if (!data) {
      return next(
        new ErrorResponse(
          `There was an error deleting your ${modelName}. Check your ${modelName}Id.`,
          404
        )
      );
    }

    successfulResponse(
      res,
      200,
      `The ${modelName} was successfully deleted.`,
      {}
    );
  }
);
