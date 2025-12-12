export enum SectionType {
  BLUEPRINT = 'Blueprint',
  FINANCIALS = 'Financials',
  BRANDING = 'Branding',
  PRODUCT = 'Product',
  CODE = 'Code',
  PITCH = 'Pitch',
  GTM = 'GTM',
  COMPLIANCE = 'Compliance', // New Section
}

export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  BENGALI = 'Bengali',
  TAMIL = 'Tamil',
  TELUGU = 'Telugu',
  MARATHI = 'Marathi',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  ARABIC = 'Arabic',
  RUSSIAN = 'Russian',
  PORTUGUESE = 'Portuguese',
  KOREAN = 'Korean'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean; // Admin Flag
  createdAt: string;
}

export interface DeploymentRecord {
  id: string;
  userEmail: string;
  projectName: string;
  valuation: string;
  royaltyStake: string; // "13%"
  deployedAt: string;
  contractHash: string;
}

export interface SavedProject {
  id: string;
  name: string;
  idea: string;
  language: Language;
  createdAt: string;
  plan: StartupPlan;
}

export interface CompliancePolicy {
  region: string;
  regulations: {
    name: string;
    description: string;
    actionRequired: string;
  }[];
  dataPrivacyLevel: string;
  riskScore: number; // 1-100
}

export interface BusinessBlueprint {
  problem: string;
  solution: string;
  usp: string;
  userPersonas: {
    name: string;
    description: string;
    painPoints: string[];
  }[];
  marketResearch: {
    tam: string;
    sam: string;
    som: string;
  };
  pricingStrategy: string;
  competitiveLandscape: {
    competitor: string;
    weakness: string;
    bizflowAdvantage: string;
  }[];
}

export interface Financials {
  revenueModel: string;
  costStructure: string[];
  unitEconomics: {
    cac: string;
    ltv: string;
    margin: string;
  };
  projections: {
    year: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
}

export interface Branding {
  name: string;
  tagline: string;
  positioning: string;
  colors: {
    name: string;
    hex: string;
    usage: string;
  }[];
  typography: {
    primary: string;
    secondary: string;
  };
  logoConcept: string;
}

export interface ProductArchitecture {
  userFlows: {
    step: string;
    description: string;
  }[];
  coreComponents: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    ai: string;
  };
  databaseSchema: string;
}

export interface MVPCode {
  frontendSnippet: string;
  backendSnippet: string;
  apiRoutes: string[];
  legalDoc?: string;
}

export interface PitchDeckSlide {
  title: string;
  content: string;
  visualCue: string;
}

export interface GTMStrategy {
  channels: {
    name: string;
    strategy: string;
  }[];
  marketingAssets: string[];
  growthLoops: string;
  launchPlan: string[];
}

export interface StartupPlan {
  blueprint: BusinessBlueprint;
  financials: Financials;
  branding: Branding;
  product: ProductArchitecture;
  code: MVPCode;
  pitchDeck: PitchDeckSlide[];
  gtm: GTMStrategy;
  compliance: CompliancePolicy; // New Field
}