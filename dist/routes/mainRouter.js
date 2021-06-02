"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stiteRouter_1 = __importDefault(require("./stiteRouter"));
function router(app) {
    app.use('/', stiteRouter_1.default);
}
exports.default = router;
