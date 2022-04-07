const { emfRouter } = require("./router");

/**
 * @example
 * const { emfAPI } = require("emfrest")
 *
 * @example <caption>Usage</caption>
 * emfAPI(app, { model: Book, modelName: "book" });
 *
 * @description Entry point for the RESTful API.
 *
 * @param {express} app Your express app.
 * @param {object} apiData Model and route data for the api.
 */
const emfAPI = (app, { model, modelName, routePrefix }) => {
  if (model && modelName) {
    const baseRoute = `${routePrefix ? routePrefix : ""}/${modelName}s`;

    app.use(baseRoute, emfRouter(model, modelName));
    console.log(`Initialized api for ${modelName} at ${baseRoute}`);
  }
};

module.exports = emfAPI;
