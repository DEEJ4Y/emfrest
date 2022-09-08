import { Application } from "express";
import { Router } from "./router";
import mongoose from "mongoose";

export interface ApiOptions {
  model: typeof mongoose.Model;
  modelName: string;
  routePrefix?: string;
  preMiddleware?: any[];
}

/**
 * @example
 * const { Api } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * Api(app, { model: Book, modelName: "book" });
 *
 * @description Entry point for the RESTful API.
 *
 * @param {Application} app Your express app.
 * @param {ApiOptions} options Options for the Api function.
 */
const Api = (
  app: Application,
  { model, modelName, routePrefix, preMiddleware }: ApiOptions
) => {
  if (!preMiddleware) {
    preMiddleware = [];
  }

  if (model && modelName) {
    const baseRoute = `${routePrefix ? routePrefix : ""}/${modelName}s`;

    app.use(baseRoute, ...preMiddleware, Router(model, modelName));
    console.log(`Initialized api for ${modelName} at ${baseRoute}`);
  }
};

export default Api;
