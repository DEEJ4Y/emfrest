import express from "express";
import mongoose from "mongoose";

import {
  getAllController,
  createResourceController,
  getOneByIdController,
  updateOneByIdController,
  deleteOneByIdController,
} from "./controllers";
import { appendModelData } from "./middleware";

const router = express.Router({ mergeParams: true });

/**
 * @example
 * const { Router } = require("emfrest/router")
 *
 * @example <caption>Usage</caption>
 * app.use("/modelName", Router(model, modelName))
 *
 * @description An express router for a resource.
 *
 * @param {mongoose.Model} model Mongoose model.
 * @param {string} modelName Model name (singular).
 *
 * @returns An express router.
 */
export const Router = (model: typeof mongoose.Model, modelName: string) => {
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
