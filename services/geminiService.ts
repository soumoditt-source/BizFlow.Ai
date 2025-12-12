import { GoogleGenAI, Type } from "@google/genai";
import { StartupPlan, Language } from "../types";

const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) throw new Error("API Key not found");
  return key;
};

const LEGAL_CONTRACT_TEMPLATE = `
# FOUNDER'S EQUITY & ROYALTY AGREEMENT (IRREVOCABLE)
**Status:** ACTIVE & BINDING
**Jurisdiction:** INTERNATIONAL / ONLINE

## 1. THE STAKEHOLDER
**Soumoditya Das** (The Architect)
*   **ID:** 4217 4813 1392 (ADHAAR)
*   **Contact:** soumoditt@gmail.com | +91 9051466483

## 2. THE TERMS
By deploying this business architecture, the Founder (User) grants Soumoditya Das:
*   **13.00% GROSS ROYALTY** on all revenue.
*   **13.00% EQUITY** in the registered entity.
*   **Access Rights:** Admin panel access to audit financials.

## 3. COMPLIANCE
This software is provided "as is" under the condition of the above stake. Failure to report revenue constitutes a breach of digital contract.
`;

export const improveIdea = async (rawIdea: string, language: Language): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert startup consultant. Rewrite the following raw startup idea into a clear, professional, and compelling one-sentence business concept suitable for pitching to investors. Keep the core meaning but make it sound premium. Language: ${language}.
      
      Raw Idea: "${rawIdea}"
      
      Output only the improved text.`,
    });
    return response.text || rawIdea;
  } catch (error) {
    console.error("Enhancement failed:", error);
    return rawIdea; // Fallback to original if API fails
  }
};

export const generateStartupPlan = async (idea: string, language: Language): Promise<StartupPlan> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are BizFlow-Core-AGI, the Supreme AI Founder Suite.
    
    TASK:
    Generate a COMPLETE, UNIQUE, and BESPOKE startup plan for: "${idea}".
    Language: ${language}.
    
    CREATIVITY INSTRUCTION:
    - Do NOT use generic templates.
    - Invent a unique brand name (not "EasyDeliver" or "QuickFix").
    - Generate specific, calculated financial projections based on real market data for this specific niche.
    - The "Competitive Advantage" must be a killer feature, not generic "better service".
    
    CRITICAL REQUIREMENTS:
    1.  **Compliance:** Analyze local laws for the language region (e.g., India for Hindi/Bengali, EU for German/French).
    2.  **Briefness:** High impact, low word count.
    3.  **Financials:** Currency must match region (INR, EUR, USD, etc.).
    
    Output strictly valid JSON matching the schema.
  `;

  // Extended Schema to include Compliance
  const jsonSchema = {
    type: Type.OBJECT,
    properties: {
      blueprint: {
        type: Type.OBJECT,
        properties: {
          problem: { type: Type.STRING },
          solution: { type: Type.STRING },
          usp: { type: Type.STRING },
          userPersonas: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, painPoints: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
          marketResearch: { type: Type.OBJECT, properties: { tam: { type: Type.STRING }, sam: { type: Type.STRING }, som: { type: Type.STRING } } },
          pricingStrategy: { type: Type.STRING },
          competitiveLandscape: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { competitor: { type: Type.STRING }, weakness: { type: Type.STRING }, bizflowAdvantage: { type: Type.STRING } } } }
        }
      },
      financials: {
        type: Type.OBJECT,
        properties: {
          revenueModel: { type: Type.STRING },
          costStructure: { type: Type.ARRAY, items: { type: Type.STRING } },
          unitEconomics: { type: Type.OBJECT, properties: { cac: { type: Type.STRING }, ltv: { type: Type.STRING }, margin: { type: Type.STRING } } },
          projections: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { year: { type: Type.STRING }, revenue: { type: Type.NUMBER }, expenses: { type: Type.NUMBER }, profit: { type: Type.NUMBER } } } }
        }
      },
      branding: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          tagline: { type: Type.STRING },
          positioning: { type: Type.STRING },
          colors: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, hex: { type: Type.STRING }, usage: { type: Type.STRING } } } },
          typography: { type: Type.OBJECT, properties: { primary: { type: Type.STRING }, secondary: { type: Type.STRING } } },
          logoConcept: { type: Type.STRING }
        }
      },
      product: {
        type: Type.OBJECT,
        properties: {
          userFlows: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { step: { type: Type.STRING }, description: { type: Type.STRING } } } },
          coreComponents: { type: Type.ARRAY, items: { type: Type.STRING } },
          techStack: { type: Type.OBJECT, properties: { frontend: { type: Type.STRING }, backend: { type: Type.STRING }, database: { type: Type.STRING }, ai: { type: Type.STRING } } },
          databaseSchema: { type: Type.STRING }
        }
      },
      code: {
        type: Type.OBJECT,
        properties: {
          frontendSnippet: { type: Type.STRING },
          backendSnippet: { type: Type.STRING },
          apiRoutes: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      },
      pitchDeck: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, visualCue: { type: Type.STRING } } } },
      gtm: { type: Type.OBJECT, properties: { channels: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, strategy: { type: Type.STRING } } } }, marketingAssets: { type: Type.ARRAY, items: { type: Type.STRING } }, growthLoops: { type: Type.STRING }, launchPlan: { type: Type.ARRAY, items: { type: Type.STRING } } } },
      compliance: {
        type: Type.OBJECT,
        properties: {
          region: { type: Type.STRING },
          regulations: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, actionRequired: { type: Type.STRING } } } },
          dataPrivacyLevel: { type: Type.STRING },
          riskScore: { type: Type.NUMBER }
        }
      }
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Startup Idea: "${idea}". Language: ${language}.`,
    config: { 
      systemInstruction, 
      responseMimeType: 'application/json', 
      responseSchema: jsonSchema,
      temperature: 0.9, // Higher temperature for unique creativity
      topK: 40,
      topP: 0.95
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response");

  try {
    const data = JSON.parse(text) as StartupPlan;
    // Inject Contract but keep it technically hidden in the UI until deployment triggers transparency
    if (data.code) data.code.legalDoc = LEGAL_CONTRACT_TEMPLATE;
    return data;
  } catch (e) {
    throw new Error("Invalid JSON");
  }
};

export const generateMarketingAsset = async (brandName: string): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using Flash Image for speed, upgrade to 'gemini-3-pro-image-preview' if high quality needed
      contents: {
        parts: [
          {
            text: `A cinematic, hyper-realistic 3D wide shot of a futuristic dark-mode digital command center. In the center, glowing holographic text reads '${brandName}' in a modern, teal-cyan sans-serif font. The background features complex financial data streams, coding syntax, and 3D architectural blueprints floating in a deep navy blue and charcoal void. Lighting is moody, with neon cyan and electric purple rim lighting. 8k resolution, unreal engine 5 render, highly detailed, sharp focus.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9", // We will crop to 2:1 on frontend if needed, or use as is for general assets
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};