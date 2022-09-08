"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
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
const Api = (app, { model, modelName, routePrefix, preMiddleware }) => {
    if (!preMiddleware) {
        preMiddleware = [];
    }
    if (model && modelName) {
        const baseRoute = `${routePrefix ? routePrefix : ""}/${modelName}s`;
        app.use(baseRoute, ...preMiddleware, (0, router_1.Router)(model, modelName));
        console.log(`Initialized api for ${modelName} at ${baseRoute}`);
    }
};
exports.default = Api;
