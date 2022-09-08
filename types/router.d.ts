import mongoose from "mongoose";
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
export declare const Router: (model: typeof mongoose.Model, modelName: string) => import("express-serve-static-core").Router;
