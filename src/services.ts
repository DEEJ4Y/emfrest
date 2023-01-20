import { asyncHandler } from "./middleware";
import mongoose from "mongoose";

/**
 * @namespace services
 *
 * @description Service functions are used to make calls to your MongoDB database using your mongoose model.
 */

/**
 * @memberof services
 *
 * @example
 * const { getAllService } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * const arrayOfDocuments = await getAllService(model, query)
 *
 * @description Database query to fetch all documents of a collection.
 *
 * @param {mongoose.Model} model Mongoose model for the collection being queried.
 * @param {object} query MongoDB or Mongoose query to filter out documents.
 *
 * @returns {object[]} The matching documents as an array of objects if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
export const getAllService = asyncHandler(
  async (model: typeof mongoose.Model, query: object) => {
    const finalQuery = query || {};
    return await model.find(finalQuery);
  }
);

/**
 * @memberof services
 *
 * @example
 * const { createResourceService } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * const document = await createResourceService(model, newDocumentData)
 *
 * @description Database query to create a document.
 *
 * @param {mongoose.Model} model Mongoose model for the collection being queried.
 * @param {object} data Object with fields to be created in the specified document.
 *
 * @returns {object} The created document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
export const createResourceService = asyncHandler(
  async (model: typeof mongoose.Model, data: object) => {
    return await model.create(data);
  }
);

/**
 * @memberof services
 *
 * @example
 * const { getOneByIdService } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * const document = await getOneByIdService(model, documentObjectId)
 *
 * @description Database query to fetch a document by it's ObjectId.
 *
 * @param {mongoose.Model} model Mongoose model for the collection being queried.
 * @param {mongoose.ObjectId} id MongoDB ObjectId of the document to be fetched.
 *
 * @returns {object} The document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
export const getOneByIdService = asyncHandler(
  async (model: typeof mongoose.Model, id: mongoose.ObjectId) => {
    return await model.findById(id);
  }
);

/**
 * @memberof services
 *
 * @example
 * const { updateOneByIdService } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * const document = await updateOneByIdService(model, documentObjectId, newDocumentData)
 *
 * @description Database query to update a document by it's ObjectId.
 *
 * @param {mongoose.Model} model Mongoose model for the collection being queried.
 * @param {mongoose.ObjectId} id MongoDB ObjectId of the document to be updated.
 * @param {object} newData Object with fields to be updated in the specified document.
 *
 * @returns {object} The updated document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
export const updateOneByIdService = asyncHandler(
  async (
    model: typeof mongoose.Model,
    id: mongoose.ObjectId,
    newData: object
  ) => {
    return await model.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });
  }
);

/**
 * @memberof services
 *
 * @example
 * const { deleteByIdService } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * const document = await deleteByIdService(model, documentObjectId)
 *
 * @description Database query to delete a document by it's ObjectId.
 *
 * @param {mongoose.Model} model Mongoose model for the collection being queried.
 * @param {mongoose.ObjectId} id MongoDB ObjectId of the document to be deleted.
 *
 * @returns {object} An empty object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
export const deleteByIdService = asyncHandler(
  async (model: typeof mongoose.Model, id: mongoose.ObjectId) => {
    return await model.findByIdAndDelete(id);
  }
);

/**
 * @example
 * const { Service } = require("emfrest/services")
 *
 * @example <caption>Usage</caption>
 * class CustomService extends Service{
 *   usefulServiceFunction = (options) => {
 *     return somethingUseful;
 *   }
 * }
 *
 * @description Service class to handle all database/api calls.
 */
export class Service {
  // Mongoose model
  model: typeof mongoose.Model;

  /**
   * @description Constructor for the Service class
   *
   * @param {mongoose.Model} _model Mongoose model for the MongoDB collection.
   */
  constructor(_model: typeof mongoose.Model) {
    this.model = _model;
  }

  /**
   * @description Database query to fetch all documents of a collection.
   *
   * @param {object | void} query MongoDB query
   */
  getAll = (query?: object) => {
    return getAllService(this.model, query || {});
  };

  /**
   * @description Database query to create a document.
   *
   * @param {object} data Data to be saved as a document.
   */
  createResource = (data: object) => {
    return createResourceService(this.model, data);
  };

  /**
   * @description Database query to find a document by ID.
   *
   * @param {mongoose.ObjectId} id MongoDB document ObjectId.
   */
  getOneById = (id: mongoose.ObjectId) => {
    return getOneByIdService(this.model, id);
  };

  /**
   * @description Database query to update a document by ID.
   *
   * @param {mongoose.ObjectId} id MongoDB document ObjectId.
   * @param {object} newData Object with fields to be updated in the document.
   */
  updateOneByIdService = (id: mongoose.ObjectId, newData: object) => {
    return updateOneByIdService(this.model, id, newData);
  };

  /**
   * @description Database query to delete a document by ID.
   *
   * @param {mongoose.ObjectId} id MongoDB document ObjectId.
   */
  deleteById = (id: mongoose.ObjectId) => {
    return deleteByIdService(this.model, id);
  };
}
