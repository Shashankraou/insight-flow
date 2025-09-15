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
  prompt: `You are an expert maintenance engineer for an advanced industrial manufacturing facility. You are analyzing the potential failure of machine {{machineId}}.

Your task is to analyze the provided feature importance scores from a predictive maintenance model and suggest the most probable root cause for the equipment's failure.

Here are the feature importances derived from sensor readings and machine status:
{{#each featureImportances}}
- '{{@key}}': {{@value}}
{{/each}}

To aid your analysis, here is a description of each feature:
* 'Air temperature [K]': The ambient air temperature in Kelvin around the machine.
* 'Process temperature [K]': The temperature in Kelvin of the key industrial process the machine is performing. Significant deviations can indicate cooling system failure or process abnormalities.
* 'Rotational speed [rpm]': The speed of a critical rotating component, measured in revolutions per minute. Unusually high or low speeds, or high variability, can point to motor or power supply issues.
* 'Torque [Nm]': The rotational force in Newton-meters applied by the component. Higher than normal torque often indicates increased friction, load, or mechanical resistance. This is a strong indicator of mechanical wear or failure.
* 'Tool wear [min]': The accumulated wear on the machine's primary tool, measured in minutes of usage. High tool wear is a direct indicator of tool degradation and can lead to poor quality output or machine malfunction if not addressed.

Based on the feature with the highest importance score, provide a concise and clear probable cause for the failure. Explain your reasoning in one or two sentences. For example, if 'Torque [Nm]' is the highest, a probable cause could be "Increased friction and mechanical strain, likely due to component wear or lubrication failure."`,
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
