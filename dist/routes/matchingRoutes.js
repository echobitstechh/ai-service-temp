"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchingController_1 = require("../controllers/matchingController");
const router = (0, express_1.Router)();
router.post('/match', matchingController_1.matchMentors);
exports.default = router;
