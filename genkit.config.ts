// genkit.config.ts
import { defineConfig } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import { flowPlugin } from '@genkit-ai/flow';

export default defineConfig({
  plugins: [googleAI(), flowPlugin()],
});
