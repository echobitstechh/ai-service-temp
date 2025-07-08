"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchMentors = void 0;
const flow_1 = require("@genkit-ai/flow");
const matchingService_1 = require("../services/matchingService");
const matchMentors = async (req, res) => {
    try {
        const { mentee, mentors } = req.body;
        if (!mentee || !mentors) {
            return res.status(400).json({ message: 'Missing mentee or mentors in request body' });
        }
        // The second argument to runFlow is the flow's input.
        const orderedMentors = await (0, flow_1.runFlow)(matchingService_1.matcherFlow, { mentee, mentors });
        res.status(200).json(orderedMentors);
    }
    catch (error) {
        console.error('Error in matchMentors controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.matchMentors = matchMentors;
