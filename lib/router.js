"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const middleware_1 = require("./middleware");
const router = express_1.default.Router({ mergeParams: true });
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
const Router = (model, modelName) => {
    router
        .route(`/`)
        .get((0, middleware_1.appendModelData)(model, modelName), controllers_1.getAllController)
        .post((0, middleware_1.appendModelData)(model, modelName), controllers_1.createResourceController);
    router
        .route(`/:${modelName}Id`)
        .get((0, middleware_1.appendModelData)(model, modelName), controllers_1.getOneByIdController)
        .put((0, middleware_1.appendModelData)(model, modelName), controllers_1.updateOneByIdController)
        .delete((0, middleware_1.appendModelData)(model, modelName), controllers_1.deleteOneByIdController);
    return router;
};
exports.Router = Router;
