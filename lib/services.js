"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.deleteByIdService = exports.updateOneByIdService = exports.getOneByIdService = exports.createResourceService = exports.getAllService = void 0;
const middleware_1 = require("./middleware");
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
exports.getAllService = (0, middleware_1.asyncHandler)(async (model, query) => {
    const finalQuery = query || {};
    return await model.find(finalQuery);
});
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
exports.createResourceService = (0, middleware_1.asyncHandler)(async (model, data) => {
    return await model.create(data);
});
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
exports.getOneByIdService = (0, middleware_1.asyncHandler)(async (model, id) => {
    return await model.findById(id);
});
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
exports.updateOneByIdService = (0, middleware_1.asyncHandler)(async (model, id, newData) => {
    return await model.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
    });
});
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
exports.deleteByIdService = (0, middleware_1.asyncHandler)(async (model, id) => {
    return await model.findByIdAndDelete(id);
});
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
class Service {
    /**
     * @description Constructor for the Service class
     *
     * @param {mongoose.Model} _model Mongoose model for the MongoDB collection.
     */
    constructor(_model) {
        /**
         * @description Database query to fetch all documents of a collection.
         *
         * @param {object | void} query MongoDB query
         */
        this.getAll = (query) => {
            return (0, exports.getAllService)(this.model, query || {});
        };
        /**
         * @description Database query to create a document.
         *
         * @param {object} data Data to be saved as a document.
         */
        this.createResource = (data) => {
            return (0, exports.createResourceService)(this.model, data);
        };
        /**
         * @description Database query to find a document by ID.
         *
         * @param {mongoose.ObjectId} id MongoDB document ObjectId.
         */
        this.getOneById = (id) => {
            return (0, exports.getOneByIdService)(this.model, id);
        };
        /**
         * @description Database query to update a document by ID.
         *
         * @param {mongoose.ObjectId} id MongoDB document ObjectId.
         * @param {object} newData Object with fields to be updated in the document.
         */
        this.updateOneByIdService = (id, newData) => {
            return (0, exports.updateOneByIdService)(this.model, id, newData);
        };
        /**
         * @description Database query to delete a document by ID.
         *
         * @param {mongoose.ObjectId} id MongoDB document ObjectId.
         */
        this.deleteById = (id) => {
            return (0, exports.deleteByIdService)(this.model, id);
        };
        this.model = _model;
    }
}
exports.Service = Service;
