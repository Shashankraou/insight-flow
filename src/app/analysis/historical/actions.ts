'use server';

import { historicalAnalysisTool, HistoricalAnalysisToolInput, HistoricalAnalysisToolOutput } from "@/ai/flows/historical-analysis-tool";

export async function runHistoricalAnalysis(input: HistoricalAnalysisToolInput): Promise<HistoricalAnalysisToolOutput> {
    try {
        // Basic JSON validation before sending to the flow
        JSON.parse(input.predictionData);
    } catch (error) {
        throw new Error("Invalid JSON format in prediction data.");
    }
    
    try {
        const result = await historicalAnalysisTool(input);
        return result;
    } catch (error) {
        console.error("Error in runHistoricalAnalysis:", error);
        throw new Error("Failed to get analysis from AI service.");
    }
}
