"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcherFlow = void 0;
const flow_1 = require("@genkit-ai/flow");
const ai_1 = require("@genkit-ai/ai");
const google_ai_1 = require("@genkit-ai/google-ai");
const z = __importStar(require("zod"));
// (The schemas remain the same)
const MentorSchema = z.object({
    id: z.string(),
    name: z.string(),
    skills: z.array(z.string()).describe("Technical and soft skills"),
    experienceYears: z.number().describe("Years of professional experience"),
    primaryGoal: z.string().describe("What the mentor wants to help with"),
});
const MenteeSchema = z.object({
    id: z.string(),
    name: z.string(),
    skills: z.array(z.string()).describe("Skills the mentee wants to develop"),
    experienceYears: z.number().describe("Years of professional experience"),
    primaryGoal: z.string().describe("The mentee's primary objective for mentorship"),
});
const MatchResultSchema = z.array(z.object({
    mentor: MentorSchema,
    matchScore: z.number().describe("A score from 0 to 100 of compatibility"),
    reasoning: z.string().describe("A brief explanation of why this mentor is a good match"),
}));
exports.matcherFlow = (0, flow_1.defineFlow)({
    name: 'matcherFlow',
    inputSchema: z.object({
        mentee: MenteeSchema,
        mentors: z.array(MentorSchema),
    }),
    outputSchema: MatchResultSchema,
}, async ({ mentee, mentors }) => {
    const prompt = `
      You are an expert matchmaker... (The prompt remains the same)
    `;
    const llmResponse = await (0, ai_1.generate)({
        model: google_ai_1.geminiPro,
        prompt: prompt,
        input: { mentee, mentors },
        output: {
            schema: MatchResultSchema,
        },
    });
    const structuredOutput = llmResponse.output();
    if (!structuredOutput) {
        console.error('LLM failed to generate valid structured output.');
        return [];
    }
    return structuredOutput;
});
