
import { defineFlow } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import { geminiPro } from '@genkit-ai/google-ai';
import * as z from 'zod';

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


export const matcherFlow = defineFlow(
  {
    name: 'matcherFlow',
    inputSchema: z.object({
      mentee: MenteeSchema,
      mentors: z.array(MentorSchema),
    }),
    outputSchema: MatchResultSchema,
  },
  async ({ mentee, mentors }) => {
    const prompt = `
      You are an expert matchmaker... (The prompt remains the same)
    `;

    const llmResponse = await generate({
      model: geminiPro,
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
  }
);
