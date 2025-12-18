import { GoogleGenAI, Type } from "@google/genai";
import { StartupPlan, Language } from "../types";

/**
 * Robust API Key Resolver
 * Ensures keys are found in both local dev (import.meta.env) 
 * and production (process.env / Vercel secrets).
 */
const getApiKey = (): string => {
  // Try Vite/Vercel standard locations
  const key = (process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY || (import.meta as any).env?.API_KEY);
  
  if (!key) {
    console.error("CRITICAL: API Key not found. Ensure environment variables are set in Vercel.");
    throw new Error("API Key initialization failed. Check System Console.");
  }
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
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert startup consultant. Rewrite the following raw startup idea into a professional one-sentence business concept. Language: ${language}.
      
      Raw Idea: "${rawIdea}"
      
      Output only the improved text.`,
    });
    return response.text || rawIdea;
  } catch (error) {
    console.error("Enhancement failed:", error);
    return rawIdea;
  }
};

export const generateStartupPlan = async (idea: string, language: Language): Promise<StartupPlan> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const systemInstruction = `
    You are BizFlow-Core-AGI, the Supreme AI Founder Suite.
    
    TASK:
    Generate a COMPLETE, UNIQUE, and PRODUCTION-READY startup plan for: "${idea}".
    Target Language: ${language}.
    
    CRITICAL INSTRUCTIONS:
    1. **Production Code:** The 'code' section must contain REAL, WORKING boilerplate code.
    2. **Live Prototype HTML (CRITICAL):** 
       - Generate a SINGLE, SELF-CONTAINED HTML string.
       - Use Tailwind CSS and React via CDN.
       - The design must be responsive, mobile-first, and high-fidelity.
       - Use Lucide icons or FontAwesome for visuals.
       - Include functional-looking UI components for the specific industry.
    
    Output strictly valid JSON matching the schema.
  `;

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
          marketResearch: { type: Type.OBJECT, properties: { tam: { type: Type.STRING }, sam: { type: Type.STRING }, som: { type: Type.STRING }, insight: { type: Type.STRING }, citations: { type: Type.ARRAY, items: { type: Type.STRING } } } },
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
      },
      livePrototypeHTML: { type: Type.STRING }
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Startup Idea: "${idea}". Language: ${language}.`,
    config: { 
      systemInstruction, 
      responseMimeType: 'application/json', 
      responseSchema: jsonSchema,
      temperature: 0.8,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Neural synthesis returned empty buffer.");

  try {
    const data = JSON.parse(text) as StartupPlan;
    if (data.code) data.code.legalDoc = LEGAL_CONTRACT_TEMPLATE;
    return data;
  } catch (e) {
    throw new Error("Neural output failed parity check. Retrying...");
  }
};

/**
 * Generates marketing visuals using specialized imagery models.
 */
export const generateMarketingAsset = async (brandName: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-fidelity 3D abstract visual representing innovation and scalability for a tech brand called "${brandName}". 
            Futuristic aesthetic, clean whitespace, 8K, depth of field.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("Imagery node returned null.");
  } catch (error) {
    console.error("Imagery synthesis failed:", error);
    throw error;
  }
};