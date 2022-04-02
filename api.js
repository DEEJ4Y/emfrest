const { emfRouter } = require("./router");

/**
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
