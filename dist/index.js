"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genkit_1 = require("genkit");
const google_ai_1 = require("@genkit-ai/google-ai");
require("dotenv/config");
const matchingRoutes_1 = __importDefault(require("./routes/matchingRoutes"));
(0, genkit_1.configureGenkit)({
    plugins: [(0, google_ai_1.googleAI)()], // Corrected to googleAI()
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', matchingRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
