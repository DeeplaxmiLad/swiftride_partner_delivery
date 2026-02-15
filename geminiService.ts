
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an intelligent delivery instruction note using Gemini.
 */
export const getIntelligentOrderDescription = async (restaurant: string, items: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional delivery instruction note for a rider picking up ${items.join(', ')} from ${restaurant}. Mention handling care if needed.`,
    });
    // Property .text returns the string output directly.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Please handle the package with care and ensure all items are present.";
  }
};

/**
 * Generates a summary insight from earnings data.
 */
export const generateEarningsReportSummary = async (earnings: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these daily earnings data points for a delivery rider into a one-sentence encouraging insight: ${JSON.stringify(earnings)}`,
    });
    return response.text;
  } catch (error) {
    return "You're doing great! Keep up the momentum to reach your weekly goal.";
  }
};
