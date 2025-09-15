'use server';

/**
 * @fileOverview Provides a tool for data scientists to review the prediction record of the configured algorithm.
 *
 * - historicalAnalysisTool - A function that analyzes the historical prediction data.
 * - HistoricalAnalysisToolInput - The input type for the historicalAnalysisTool function.
 * - HistoricalAnalysisToolOutput - The return type for the historicalAnalysisTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HistoricalAnalysisToolInputSchema = z.object({
  predictionData: z.string().describe('Historical prediction data in JSON format, including actual and predicted values.'),
  significanceLevel: z.number().default(0.05).describe('The statistical significance level to use for evaluation (e.g., 0.05 for 95% confidence).'),
  minimumDataPoints: z.number().default(30).describe('The minimum number of data points required to perform a statistically significant evaluation.'),
});
export type HistoricalAnalysisToolInput = z.infer<typeof HistoricalAnalysisToolInputSchema>;

const HistoricalAnalysisToolOutputSchema = z.object({
  analysisResult: z.string().describe('A summary of the historical prediction analysis, including statistical significance evaluation and warnings if data is insufficient.'),
  isSufficientData: z.boolean().describe('Indicates whether sufficient data is available for a reliable evaluation.'),
});
export type HistoricalAnalysisToolOutput = z.infer<typeof HistoricalAnalysisToolOutputSchema>;


export async function historicalAnalysisTool(input: HistoricalAnalysisToolInput): Promise<HistoricalAnalysisToolOutput> {
  return historicalAnalysisToolFlow(input);
}

const historicalAnalysisToolPrompt = ai.definePrompt({
  name: 'historicalAnalysisToolPrompt',
  input: {schema: HistoricalAnalysisToolInputSchema},
  output: {schema: HistoricalAnalysisToolOutputSchema},
  prompt: `You are an expert data analyst responsible for evaluating the historical performance of a predictive model.

  Analyze the provided historical prediction data to determine if there is sufficient data to evaluate the model with acceptable statistical significance.
  Consider the significance level and minimum data points provided.

  If the data is insufficient, provide a warning message indicating that the evaluation may not be reliable.
  Otherwise, provide a summary of the analysis, including key statistical metrics (e.g., accuracy, precision, recall, F1-score).

  Historical Prediction Data: {{{predictionData}}}
  Significance Level: {{{significanceLevel}}}
  Minimum Data Points: {{{minimumDataPoints}}}
  `,
});

const historicalAnalysisToolFlow = ai.defineFlow(
  {
    name: 'historicalAnalysisToolFlow',
    inputSchema: HistoricalAnalysisToolInputSchema,
    outputSchema: HistoricalAnalysisToolOutputSchema,
  },
  async input => {
    try {
      // Parse the prediction data from JSON string to a JavaScript object
      const predictionData = JSON.parse(input.predictionData);

      // Check if the data is an array and has enough data points
      if (!Array.isArray(predictionData) || predictionData.length < input.minimumDataPoints) {
        return {
          analysisResult: `Insufficient data available.  At least ${input.minimumDataPoints} data points are required for a reliable evaluation.`, 
          isSufficientData: false,
        };
      }

      const {output} = await historicalAnalysisToolPrompt(input);
      // The prompt expects isSufficientData to be set, but it's not in the prompt's responsibility.
      // So we call the prompt and then augment the output.
      if (output) {
        output.isSufficientData = true;
        return output;
      }
      // if for some reason the output is null, we should return a default value
      return {
        analysisResult: 'Analysis could not be completed.',
        isSufficientData: false,
      };
    } catch (error: any) {
      console.error("Error during historical analysis:", error);
      return {
        analysisResult: `An error occurred during analysis: ${error.message || 'Unknown error'}. Please check the prediction data format.`,
        isSufficientData: false,
      };
    }
  }
);
