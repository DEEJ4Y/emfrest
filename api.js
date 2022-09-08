const { Router } = require("./router");

/**
 * @example
 * const { Api } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * Api(app, { model: Book, modelName: "book" });
 *
 * @description Entry point for the RESTful API.
 *
 * @param {express} app Your express app.
 * @param {object} apiData Model and route data for the api.
 * @param {string} routePrefix URL path prefix for the API endpoint.
 * @param {array<MiddlewareFunction>} preMiddleware Endpoint specific middleware to run before the controller
 * @param {array<MiddlewareFunction>} postMiddleware Endpoint specific middleware to run before the controller
 */
const Api = (
  app,
  { model, modelName, routePrefix, preMiddleware, postMiddleware }
) => {
  if (!preMiddleware) {
    preMiddleware = [];
  }

  if (!postMiddleware) {
    postMiddleware = [];
  }

  if (model && modelName) {
    const baseRoute = `${routePrefix ? routePrefix : ""}/${modelName}s`;

    app.use(
      baseRoute,
      ...preMiddleware,
      Router(model, modelName),
      ...postMiddleware
    );
    console.log(`Initialized api for ${modelName} at ${baseRoute}`);
  }
};

module.exports = Api;
