'use server';
/**
 * @fileOverview An AI agent that analyzes feature importance metrics to suggest the probable cause of equipment failure.
 *
 * - analyzeFailureRootCause - A function that analyzes feature importance and suggests probable causes.
 * - FailureRootCauseInput - The input type for the analyzeFailureRootCause function.
 * - FailureRootCauseOutput - The return type for the analyzeFailureRootCause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FailureRootCauseInputSchema = z.object({
  featureImportances: z.record(z.number()).describe("A map of feature names to their importance scores in the model.  Feature names should match the columns in the AI4I-2020 dataset."),
  machineId: z.string().describe('The ID of the machine for which to analyze the failure root cause.'),
});
export type FailureRootCauseInput = z.infer<typeof FailureRootCauseInputSchema>;

const FailureRootCauseOutputSchema = z.object({
  probableCause: z.string().describe('The probable cause of the equipment failure, based on the feature importances.'),
});
export type FailureRootCauseOutput = z.infer<typeof FailureRootCauseOutputSchema>;

export async function analyzeFailureRootCause(input: FailureRootCauseInput): Promise<FailureRootCauseOutput> {
  return analyzeFailureRootCauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'failureRootCausePrompt',
  input: {schema: FailureRootCauseInputSchema},
  output: {schema: FailureRootCauseOutputSchema},
  prompt: `You are an expert maintenance engineer. You are analyzing the potential failure of machine {{machineId}}. Based on the provided feature importances, suggest the most probable cause of the failure.

Feature Importances:
{{#each featureImportances}}
  {{@key}}: {{@value}}
{{/each}}

Consider the following about the features:
* 'Air temperature [K]' - ambient air temperature
* 'Process temperature [K]' - temperature of a key industrial process
* 'Rotational speed [rpm]' - speed of a rotating element
* 'Torque [Nm]' - rotational force applied to a rotating element
* 'Tool wear [min]' - amount of wear on a tool.  High tool wear can indicate machine malfunction.
* Other derived features

What is the probable cause of the failure?`,
});

const analyzeFailureRootCauseFlow = ai.defineFlow(
  {
    name: 'analyzeFailureRootCauseFlow',
    inputSchema: FailureRootCauseInputSchema,
    outputSchema: FailureRootCauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
