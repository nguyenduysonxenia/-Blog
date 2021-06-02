"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
dotenv_1.default.config();
app.use(cors_1.default());
db_1.default();
app.use(body_parser_1.default.json());
mainRouter_1.default(app);
app.listen(process.env.SERVER_PORT, () => console.log('server runing'));
