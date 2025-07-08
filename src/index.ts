import express from 'express';
import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-ai';
import 'dotenv/config';

import matchingRoutes from './routes/matchingRoutes';

configureGenkit({
  plugins: [googleAI()], // Corrected to googleAI()
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', matchingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
