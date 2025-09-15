'use server';

import { analyzeFailureRootCause, FailureRootCauseInput, FailureRootCauseOutput } from "@/ai/flows/failure-root-cause-analysis";

export async function runFailureAnalysis(input: FailureRootCauseInput): Promise<FailureRootCauseOutput> {
  try {
    const result = await analyzeFailureRootCause(input);
    return result;
  } catch (error) {
    console.error("Error in runFailureAnalysis:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
}
