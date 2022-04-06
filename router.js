const {
  getAllController,
  createResourceController,
  getOneByIdController,
  updateOneByIdController,
  deleteOneByIdController,
} = require("./controllers");
const { appendModelData } = require("./middleware");

const router = require("express").Router({ mergeParams: true });

/**
 * @exports emfrest/router
 *
 * @description An express router for a resource.
 *
 * @param {mongoose.model} model Mongoose model.
 * @param {string} modelName Model name (singular).
 *
 * @returns An express router.
 */
exports.emfRouter = (model, modelName) => {
  router
    .route(`/`)
    .get(appendModelData(model, modelName), getAllController)
    .post(appendModelData(model, modelName), createResourceController);
  router
    .route(`/:${modelName}Id`)
    .get(appendModelData(model, modelName), getOneByIdController)
    .put(appendModelData(model, modelName), updateOneByIdController)
    .delete(appendModelData(model, modelName), deleteOneByIdController);

  return router;
};
