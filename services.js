const { asyncHandler } = require("./middleware");

/**
 * @example
 * const { getAllService } = require("emfrest/services")
 *
 * const arrayOfDocuments = await getAllService(model, query)
 *
 * @description Database query to fetch all documents of a collection.
 *
 * @param {mongoose.model} model Mongoose model for the collection being queried.
 * @param {mongodb.ObjectId} query MongoDB or Mongoose query to filter out documents.
 *
 * @returns {object[]} The matching documents as an array of objects if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
exports.getAllService = asyncHandler(async (model, query) => {
  const finalQuery = query || {};
  return await model.find(finalQuery);
});

/**
 * @example
 * const { createResourceService } = require("emfrest/services")
 *
 * const document = await createResourceService(model, newDocumentData)
 *
 * @description Database query to create a document.
 *
 * @param {mongoose.model} model Mongoose model for the collection being queried.
 * @param {object} newData Object with fields to be created in the specified document.
 *
 * @returns {object} The created document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
exports.createResourceService = asyncHandler(async (model, data) => {
  return await model.create(data);
});

/**
 * @example
 * const { getOneByIdService } = require("emfrest/services")
 *
 * const document = await getOneByIdService(model, documentObjectId)
 *
 * @description Database query to fetch a document by it's ObjectId.
 *
 * @param {mongoose.model} model Mongoose model for the collection being queried.
 * @param {mongodb.ObjectId} id MongoDB ObjectId of the document to be fetched.
 *
 * @returns {object} The document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
exports.getOneByIdService = asyncHandler(async (model, id) => {
  return await model.findById(id);
});

/**
 * @example
 * const { updateOneByIdService } = require("emfrest/services")
 *
 * const document = await updateOneByIdService(model, documentObjectId, newDocumentData)
 *
 * @description Database query to update a document by it's ObjectId.
 *
 * @param {mongoose.model} model Mongoose model for the collection being queried.
 * @param {mongodb.ObjectId} id MongoDB ObjectId of the document to be updated.
 * @param {object} newData Object with fields to be updated in the specified document.
 *
 * @returns {object} The updated document as an object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
exports.updateOneByIdService = asyncHandler(async (model, id, newData) => {
  return await model.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
  });
});

/**
 * @example
 * const { deleteByIdService } = require("emfrest/services")
 *
 * const document = await deleteByIdService(model, documentObjectId)
 *
 * @description Database query to delete a document by it's ObjectId.
 *
 * @param {mongoose.model} model Mongoose model for the collection being queried.
 * @param {mongodb.ObjectId} id MongoDB ObjectId of the document to be deleted.
 *
 * @returns {object} An empty object if successful.
 * @returns {object} A mongoose error object if unsuccessful.
 */
exports.deleteByIdService = asyncHandler(async (model, id) => {
  return await model.findByIdAndDelete(id);
});
