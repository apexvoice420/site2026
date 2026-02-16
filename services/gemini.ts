
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMarketingContent = async (niche: string, targetTopic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 high-impact marketing assets for an AI Voice Agent business targeting ${niche}. 
    Topic: ${targetTopic}. 
    Provide one TikTok script, one cold email subject line, and one Facebook group post. 
    Keep it trades-friendly, punchy, and outcome-focused.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tiktokScript: { type: Type.STRING },
          emailSubject: { type: Type.STRING },
          facebookPost: { type: Type.STRING }
        },
        required: ["tiktokScript", "emailSubject", "facebookPost"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const analyzeTranscript = async (transcript: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following call transcript for a roofing/plumbing business. 
    Extract the customer name, phone, issue, and whether it is an emergency. 
    Transcript: ${transcript}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          customerName: { type: Type.STRING },
          phone: { type: Type.STRING },
          issueDescription: { type: Type.STRING },
          isEmergency: { type: Type.BOOLEAN }
        },
        required: ["customerName", "phone", "issueDescription", "isEmergency"]
      }
    }
  });

  return JSON.parse(response.text);
};
