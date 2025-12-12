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
    return rawIdea;
  }
};

export const generateStartupPlan = async (idea: string, language: Language): Promise<StartupPlan> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are BizFlow-Core-AGI, the Supreme AI Founder Suite.
    
    TASK:
    Generate a COMPLETE, UNIQUE, and PRODUCTION-READY startup plan for: "${idea}".
    Target Language: ${language}.
    
    CRITICAL INSTRUCTIONS:
    1. **Production Code:** The 'code' section must contain REAL, WORKING boilerplate code, not placeholders.
    2. **Market Research:** Provide specific numbers (TAM/SAM/SOM). REQUIRED: Provide 3 real-world **citations** in the 'citations' array (e.g., "Gartner 2023: AI Market Report").
    3. **Live Prototype:** In the 'livePrototypeHTML' field, generate a SINGLE FILE, SELF-CONTAINED HTML string that includes React (via CDN), TailwindCSS, and Babel. 
       - It must be a fully functional "MVP" dashboard or landing page for the user's specific idea.
       - Use 'lucide-react' for icons if needed (via CDN).
       - It should look amazing (dark mode, glassmorphism, animations).
       - It must be ready to run just by saving as .html.
    
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
      livePrototypeHTML: { type: Type.STRING, description: "A complete, single-file HTML string containing a React application (using Babel standalone) that serves as a functional MVP prototype for this specific business idea. Include TailwindCSS via CDN. Ensure it is complete." }
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Startup Idea: "${idea}". Language: ${language}.`,
    config: { 
      systemInstruction, 
      responseMimeType: 'application/json', 
      responseSchema: jsonSchema,
      temperature: 0.9,
      topK: 40,
      topP: 0.95
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response");

  try {
    const data = JSON.parse(text) as StartupPlan;
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
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A cinematic, hyper-realistic 3D wide shot of a futuristic dark-mode digital command center. In the center, glowing holographic text reads '${brandName}' in a modern, teal-cyan sans-serif font. The background features complex financial data streams, coding syntax, and 3D architectural blueprints floating in a deep navy blue and charcoal void. Lighting is moody, with neon cyan and electric purple rim lighting. 8k resolution, unreal engine 5 render, highly detailed, sharp focus.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

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