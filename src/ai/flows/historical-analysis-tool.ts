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
  predictionData: z.string().describe('Historical prediction data in JSON format, as an array of objects with "actual" and "predicted" numbers (0 for no failure, 1 for failure).'),
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
  input: {schema: z.object({
    predictionData: z.array(z.object({actual: z.number(), predicted: z.number()})),
    significanceLevel: z.number(),
    minimumDataPoints: z.number(),
  })},
  output: {schema: z.object({
    analysisResult: z.string().describe('A summary of the historical prediction analysis, including statistical significance evaluation and warnings if data is insufficient.'),
  })},
  prompt: `You are an expert data analyst responsible for evaluating the historical performance of a predictive maintenance model.

Analyze the provided historical prediction data. The data consists of actual outcomes and model predictions, where 1 indicates a failure and 0 indicates normal operation.

Based on the data, calculate the following metrics:
- True Positives (TP): Correctly predicted failures.
- False Positives (FP): Incorrectly predicted failures (Type I error).
- True Negatives (TN): Correctly predicted normal operations.
- False Negatives (FN): Missed failures (Type II error).
- Accuracy: (TP + TN) / (Total)
- Precision: TP / (TP + FP)
- Recall (Sensitivity): TP / (TP + FN)
- F1-Score: 2 * (Precision * Recall) / (Precision + Recall)

Provide a summary of these metrics. Then, offer a brief interpretation of the model's performance based on these results. For example, a high recall is critical in predictive maintenance to avoid missing failures, even at the cost of some false positives.

Historical Prediction Data:
{{#each predictionData}}
- Actual: {{actual}}, Predicted: {{predicted}}
{{/each}}
  `,
});

const historicalAnalysisToolFlow = ai.defineFlow(
  {
    name: 'historicalAnalysisToolFlow',
    inputSchema: HistoricalAnalysisToolInputSchema,
    outputSchema: HistoricalAnalysisToolOutputSchema,
  },
  async input => {
    let parsedData;
    try {
      parsedData = JSON.parse(input.predictionData);
    } catch (error: any) {
      console.error("Error parsing prediction data:", error);
      return {
        analysisResult: `Failed to parse prediction data. Please ensure it is valid JSON. Error: ${error.message}`,
        isSufficientData: false,
      };
    }

    if (!Array.isArray(parsedData) || parsedData.length < input.minimumDataPoints) {
      return {
        analysisResult: `Insufficient data available. At least ${input.minimumDataPoints} data points are required for a reliable evaluation. You provided ${parsedData.length}.`,
        isSufficientData: false,
      };
    }

    try {
      const {output} = await historicalAnalysisToolPrompt({
        predictionData: parsedData,
        significanceLevel: input.significanceLevel,
        minimumDataPoints: input.minimumDataPoints,
      });

      if (output) {
        return {
          analysisResult: output.analysisResult,
          isSufficientData: true,
        };
      }
      
      return {
        analysisResult: 'Analysis could not be completed by the AI model.',
        isSufficientData: true, // Data was sufficient, but model failed
      };
    } catch (error: any) {
      console.error("Error during historical analysis AI call:", error);
      return {
        analysisResult: `An error occurred during AI analysis: ${error.message || 'Unknown error'}.`,
        isSufficientData: true, // Data was sufficient, but model failed
      };
    }
  }
);
