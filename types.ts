export enum SectionType {
  BLUEPRINT = 'Blueprint',
  FINANCIALS = 'Financials',
  BRANDING = 'Branding',
  PRODUCT = 'Product',
  CODE = 'Code',
  PITCH = 'Pitch',
  GTM = 'GTM',
  COMPLIANCE = 'Compliance', 
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
  isAdmin: boolean;
  createdAt: string;
  govId?: string;
  phone?: string;
  address?: string;
}

export interface DeploymentRecord {
  id: string;
  userEmail: string;
  projectName: string;
  valuation: string;
  royaltyStake: string;
  deployedAt: string;
  contractHash: string;
  signerName: string;
  signerGovId: string;
  signerPhone: string;
}

export interface SavedProject {
  id: string;
  name: string;
  idea: string;
  language: Language;
  createdAt: string;
  plan: StartupPlan;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  details: string;
  sessionId: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface UserFeedback {
  id: string;
  userEmail: string;
  rating: number;
  comment: string;
  submittedAt: string;
  projectName: string;
}

export interface CompliancePolicy {
  region: string;
  regulations: {
    name: string;
    description: string;
    actionRequired: string;
  }[];
  dataPrivacyLevel: string;
  riskScore: number;
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
    insight: string; 
    citations: string[];
  };
  pricingStrategy: string;
  competitiveLandscape: {
    competitor: string;
    weakness: string;
    bizflowAdvantage: string;
  }[];
  expertInsights?: string[]; // DELIBERATION NOTES FROM THE 10 MASTERS
  groundingSources?: { title: string; uri: string }[]; // SEARCH LINKS
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
  compliance: CompliancePolicy;
  livePrototypeHTML?: string; 
}