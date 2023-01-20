import { Response, NextFunction } from "express";

import {
  asyncMiddlewareHandler,
  ModelRequest,
  successfulResponse,
} from "./middleware";
import {
  getAllService,
  createResourceService,
  getOneByIdService,
  updateOneByIdService,
  deleteByIdService,
} from "./services";
import { ErrorResponse } from "./utils";
import { ObjectId } from "mongoose";

/**
 * @example
 * const { getAllController } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * router.route("/").get(getAllController)
 *
 * @description Request/Response handler function to get all of a resource.
 *
 * @param {ModelRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
export const getAllController = asyncMiddlewareHandler(
  async (req: ModelRequest, res: Response, next: NextFunction) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const data = await getAllService(model, {});

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
      `The ${modelName}s were successfully found.`,
      data
    );
  }
);

/**
 * @example
 * const { createResourceController } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * router.route("/").post(createResourceController)
 *
 * @description Request/Response handler function to create a resource.
 *
 * @param {ModelRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
export const createResourceController = asyncMiddlewareHandler(
  async (req: ModelRequest, res: Response, next: NextFunction) => {
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
 * @example
 * const { getOneByIdController } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * router.route("/:id").get(getOneByIdController)
 *
 * @description Request/Response handler function to fetch a document by its MongoDB ObjectId.
 *
 * @param {ModelRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
export const getOneByIdController = asyncMiddlewareHandler(
  async (req: ModelRequest, res: Response, next: NextFunction) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    const data = await getOneByIdService(
      model,
      resourceId as unknown as ObjectId
    );

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
 * @example
 * const { updateOneByIdController } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * router.route("/:id").put(updateOneByIdController)
 *
 * @description Request/Response handler function to update a document by its MongoDB ObjectId.
 *
 * @param {ModelRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
export const updateOneByIdController = asyncMiddlewareHandler(
  async (req: ModelRequest, res: Response, next: NextFunction) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    const newDocumentData = req.body;

    const data = await updateOneByIdService(
      model,
      resourceId as unknown as ObjectId,
      newDocumentData
    );

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
 * @example
 * const { deleteOneByIdController } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * router.route("/:id").delete(deleteOneByIdController)
 *
 * @description Request/Response handler function to delete a document by its MongoDB ObjectId.
 *
 * @param {ModelRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {object} An error object if unsuccessful and passes control to next middleware. Else sends a successful response.
 */
export const deleteOneByIdController = asyncMiddlewareHandler(
  async (req: ModelRequest, res: Response, next: NextFunction) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;

    const resourceId = req.params[`${modelName}Id`];

    const data = await deleteByIdService(
      model,
      resourceId as unknown as ObjectId
    );

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

/**
 * @example
 * const { Controller } = require("emfrest/controllers")
 *
 * @example <caption>Usage</caption>
 * class CustomController extends Controller{
 *   usefulControllerFunction = (req, res, next) => {
 *     // Process request
 *     // Send response
 *   }
 * }
 *
 * @description Controller class to handle all requests and responses.
 */
export class Controller {
  /**
   * @description Controller function to get all documents of a collection.
   */
  getAll = getAllController;

  /**
   * @description Controller function to create a new document.
   */
  createResource = createResourceController;

  /**
   * @description Controller function to get a single document by its id.
   */
  getOneById = getOneByIdController;

  /**
   * @description Controller function to update a document by its id.
   */
  updateOneById = updateOneByIdController;

  /**
   * @description Controller function to delete a document by its id.
   */
  deleteOneById = deleteOneByIdController;
}
