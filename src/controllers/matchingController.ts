
import { Request, Response } from 'express';
import { runFlow } from '@genkit-ai/flow';
import { matcherFlow } from '../services/matchingService';

export const matchMentors = async (req: Request, res: Response) => {
  try {
    const { mentee, mentors } = req.body;

    if (!mentee || !mentors) {
      return res.status(400).json({ message: 'Missing mentee or mentors in request body' });
    }

    // The second argument to runFlow is the flow's input.
    const orderedMentors = await runFlow(matcherFlow, { mentee, mentors });
    res.status(200).json(orderedMentors);
  } catch (error) {
    console.error('Error in matchMentors controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
