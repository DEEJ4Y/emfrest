import { Application } from "express";
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
declare const Api: (app: Application, { model, modelName, routePrefix, preMiddleware }: ApiOptions) => void;
export default Api;
