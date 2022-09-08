/// <reference types="qs" />
import { Response, NextFunction } from "express";
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
export declare const getAllController: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
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
export declare const createResourceController: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
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
export declare const getOneByIdController: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
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
export declare const updateOneByIdController: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
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
export declare const deleteOneByIdController: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
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
export declare class Controller {
    /**
     * @description Controller function to get all documents of a collection.
     */
    getAll: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
    /**
     * @description Controller function to create a new document.
     */
    createResource: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
    /**
     * @description Controller function to get a single document by its id.
     */
    getOneById: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
    /**
     * @description Controller function to update a document by its id.
     */
    updateOneById: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
    /**
     * @description Controller function to delete a document by its id.
     */
    deleteOneById: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
}
