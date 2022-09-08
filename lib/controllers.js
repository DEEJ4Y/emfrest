"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.deleteOneByIdController = exports.updateOneByIdController = exports.getOneByIdController = exports.createResourceController = exports.getAllController = void 0;
const middleware_1 = require("./middleware");
const services_1 = require("./services");
const utils_1 = require("./utils");
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
exports.getAllController = (0, middleware_1.asyncMiddlewareHandler)(async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;
    const data = await (0, services_1.getAllService)(model, {});
    if (!data) {
        return next(new utils_1.ErrorResponse(`There was an error fetching your ${modelName}s.`, 404));
    }
    (0, middleware_1.successfulResponse)(res, 200, `The ${modelName}s were successfully found.`, data);
});
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
exports.createResourceController = (0, middleware_1.asyncMiddlewareHandler)(async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;
    const newDocumentData = req.body;
    const data = await (0, services_1.createResourceService)(model, newDocumentData);
    if (!data) {
        return next(new utils_1.ErrorResponse(`There was an error fetching your ${modelName}s.`, 404));
    }
    (0, middleware_1.successfulResponse)(res, 200, `The ${modelName}s were successfully created.`, data);
});
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
exports.getOneByIdController = (0, middleware_1.asyncMiddlewareHandler)(async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;
    const resourceId = req.params[`${modelName}Id`];
    const data = await (0, services_1.getOneByIdService)(model, resourceId);
    if (!data) {
        return next(new utils_1.ErrorResponse(`There was an error fetching your ${modelName}. Check your ${modelName}Id.`, 404));
    }
    (0, middleware_1.successfulResponse)(res, 200, `The ${modelName} was successfully found.`, data);
});
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
exports.updateOneByIdController = (0, middleware_1.asyncMiddlewareHandler)(async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;
    const resourceId = req.params[`${modelName}Id`];
    const newDocumentData = req.body;
    const data = await (0, services_1.updateOneByIdService)(model, resourceId, newDocumentData);
    if (!data) {
        return next(new utils_1.ErrorResponse(`There was an error updating your ${modelName}. Check your ${modelName}Id.`, 404));
    }
    (0, middleware_1.successfulResponse)(res, 200, `The ${modelName} was successfully updated.`, data);
});
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
exports.deleteOneByIdController = (0, middleware_1.asyncMiddlewareHandler)(async (req, res, next) => {
    const model = req.emfrest_model;
    const modelName = req.emfrest_modelName;
    const resourceId = req.params[`${modelName}Id`];
    const data = await (0, services_1.deleteByIdService)(model, resourceId);
    if (!data) {
        return next(new utils_1.ErrorResponse(`There was an error deleting your ${modelName}. Check your ${modelName}Id.`, 404));
    }
    (0, middleware_1.successfulResponse)(res, 200, `The ${modelName} was successfully deleted.`, {});
});
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
class Controller {
    constructor() {
        /**
         * @description Controller function to get all documents of a collection.
         */
        this.getAll = exports.getAllController;
        /**
         * @description Controller function to create a new document.
         */
        this.createResource = exports.createResourceController;
        /**
         * @description Controller function to get a single document by its id.
         */
        this.getOneById = exports.getOneByIdController;
        /**
         * @description Controller function to update a document by its id.
         */
        this.updateOneById = exports.updateOneByIdController;
        /**
         * @description Controller function to delete a document by its id.
         */
        this.deleteOneById = exports.deleteOneByIdController;
    }
}
exports.Controller = Controller;
