import { Language } from '../types';

const defaultEn = {
  // General
  inputPlaceholder: "e.g., An Uber for dog walkers with real-time GPS tracking...",
  generateBtn: "Generate Empire",
  architecting: "Architecting...",
  deployBtn: "Deploy Prototype",
  launchBtn: "Launch Live App",
  signing: "Signing Contracts...",
  saveBtn: "Save to Vault",
  newIdea: "Reset System",
  loginTitle: "BizFlow Command Login",
  loginBtn: "Access Terminal",
  signupBtn: "Create Secure ID",
  tutorialTitle: "Protocol Initiation",
  adminPanel: "Admin Overwatch",
  complianceTitle: "Regulatory Scan",
  
  // Loading Steps
  loading_market: "Analyzing Market Opportunity...",
  loading_finance: "Constructing Financial Models...",
  loading_brand: "Designing Brand Identity...",
  loading_tech: "Architecting Product Stack...",
  loading_code: "Generating Production Code...",
  loading_gtm: "Refining GTM Strategy...",
  loading_pitch: "Finalizing Pitch Deck...",

  // Tabs
  tabBlueprint: "Blueprint",
  tabFinancials: "Financials",
  tabBranding: "Branding",
  tabProduct: "Product",
  tabCode: "Code",
  tabPitch: "Pitch Deck",
  tabGTM: "Go-To-Market",
  
  // Blueprint
  problem: "Problem",
  solution: "Solution",
  usp: "Unique Selling Prop",
  marketStats: "Market Analysis",
  tam: "TAM (Total Addressable)",
  sam: "SAM (Serviceable Available)",
  som: "SOM (Serviceable Obtainable)",
  personas: "Target Personas",
  competition: "Competitive Landscape",
  weakness: "Weakness",
  advantage: "Our Advantage",
  pricing: "Pricing Strategy",
  citations: "Market Citations",
  
  // Financials
  cac: "CAC",
  ltv: "LTV",
  margin: "Gross Margin",
  projectionTitle: "5-Year Growth Projection",
  revenue: "Revenue",
  expenses: "Expenses",
  profit: "Profit",
  revModel: "Revenue Model",
  costStruct: "Cost Structure",
  
  // Product
  techStack: "Tech Stack",
  coreComp: "Core System Components",
  userJourney: "User Journey Map",
  dbSchema: "Database Schema Design",
  
  // Pitch
  slide: "Slide",
  visualCue: "Visual Cue",
  exportPng: "Export Slide (PNG)",
  exportPdf: "Export Deck (PDF)",
  prev: "Previous",
  next: "Next",
  
  // GTM
  launchMap: "Launch Roadmap",
  channels: "Acquisition Channels",
  assets: "Required Assets",
  growthLoop: "Primary Growth Loop",

  // Compliance
  region: "Region",
  riskScore: "Compliance Score",
  actionReq: "Action Required",
  dataPrivacy: "Data Privacy Level"
};

export type LabelKey = keyof typeof defaultEn;

export const translations: Record<Language, typeof defaultEn> = {
  [Language.ENGLISH]: defaultEn,
  [Language.BENGALI]: {
    ...defaultEn,
    inputPlaceholder: "উদাহরণস্বরূপ, জিপিএস ট্র্যাকিং সহ একটি অনলাইন ডেলিভারি ব্যবসা...",
    generateBtn: "সাম্রাজ্য তৈরি করুন",
    architecting: "পরিকল্পনা করা হচ্ছে...",
    deployBtn: "প্রোটোটাইপ ডিপ্লয় করুন",
    launchBtn: "লাইভ অ্যাপ খুলুন",
    signing: "চুক্তি স্বাক্ষর হচ্ছে...",
    saveBtn: "সংরক্ষণ করুন",
    newIdea: "রিসেট",
    loginTitle: "বিজফ্লো কমান্ড লগইন",
    loginBtn: "প্রবেশ করুন",
    complianceTitle: "আইনি স্ক্যান",
    loading_market: "বাজার বিশ্লেষণ করা হচ্ছে...",
    loading_finance: "আর্থিক মডেল তৈরি করা হচ্ছে...",
    loading_brand: "ব্র্যান্ড ডিজাইন করা হচ্ছে...",
    loading_tech: "প্রযুক্তিগত স্থাপত্য তৈরি...",
    loading_code: "কোড জেনারেট করা হচ্ছে...",
    tabBlueprint: "ব্লুপ্রিন্ট",
    tabFinancials: "আর্থিক",
    tabBranding: "ব্র্যান্ডিং",
    tabProduct: "পণ্য",
    tabCode: "কোড",
    tabPitch: "পিচ ডেক",
    tabGTM: "মার্কেটিং",
    problem: "সমস্যা",
    solution: "সমাধান",
    marketStats: "বাজার বিশ্লেষণ",
    personas: "লক্ষ্য গ্রাহক",
    competition: "প্রতিযোগিতা",
    citations: "তথ্যসূত্র",
    revenue: "আয়",
    profit: "লাভ"
  },
  [Language.HINDI]: {
    ...defaultEn,
    inputPlaceholder: "उदाहरण के लिए, एक ऑनलाइन डिलीवरी व्यवसाय...",
    generateBtn: "साम्राज्य बनाएँ",
    architecting: "निर्माण जारी...",
    deployBtn: "प्रोटोटाइप तैनात करें",
    launchBtn: "ऐप लॉन्च करें",
    signing: "अनुबंध हस्ताक्षर...",
    saveBtn: "सहेजें",
    newIdea: "रीसेट",
    loginTitle: "लॉगिन",
    loginBtn: "एक्सेस करें",
    loading_market: "बाजार विश्लेषण...",
    loading_finance: "वित्तीय मॉडल...",
    tabBlueprint: "खाका",
    tabFinancials: "वित्तीय",
    tabBranding: "ब्रांडिंग",
    tabProduct: "उत्पाद",
    problem: "समस्या",
    solution: "समाधान",
    citations: "उद्धरण",
    revenue: "राजस्व",
    profit: "लाभ"
  },
  [Language.SPANISH]: {
    ...defaultEn,
    inputPlaceholder: "Ej. Un Uber para paseadores de perros...",
    generateBtn: "Generar Imperio",
    deployBtn: "Desplegar Prototipo",
    launchBtn: "Lanzar App",
    saveBtn: "Guardar",
    loading_market: "Analizando mercado...",
    tabBlueprint: "Plano",
    tabFinancials: "Finanzas",
    tabBranding: "Marca",
    tabProduct: "Producto",
    citations: "Citaciones",
    problem: "Problema",
    solution: "Solución"
  },
  [Language.FRENCH]: { 
     ...defaultEn, 
     generateBtn: "Générer l'Empire", 
     deployBtn: "Déployer",
     loading_market: "Analyse du marché...",
     tabBlueprint: "Plan",
     tabFinancials: "Finances",
     problem: "Problème",
     solution: "Solution"
  },
  [Language.GERMAN]: { 
     ...defaultEn, 
     generateBtn: "Imperium Generieren", 
     deployBtn: "Einsetzen",
     loading_market: "Marktanalyse...",
     tabBlueprint: "Blaupause",
     tabFinancials: "Finanzen",
     problem: "Problem",
     solution: "Lösung"
  },
  [Language.CHINESE]: { 
     ...defaultEn, 
     generateBtn: "建立帝国", 
     deployBtn: "部署", 
     loading_market: "市场分析...",
     tabBlueprint: "蓝图",
     tabFinancials: "财务",
     problem: "问题",
     solution: "解决方案"
  },
  [Language.JAPANESE]: { 
     ...defaultEn, 
     generateBtn: "帝国を築く", 
     deployBtn: "展開する",
     loading_market: "市場分析...",
     tabBlueprint: "青写真",
     tabFinancials: "財務",
     problem: "課題",
     solution: "解決策"
  },
  [Language.ARABIC]: { ...defaultEn, generateBtn: "بناء الإمبراطورية", deployBtn: "نشر" },
  [Language.RUSSIAN]: { ...defaultEn, generateBtn: "Создать Империю", deployBtn: "Развернуть" },
  [Language.PORTUGUESE]: { ...defaultEn, generateBtn: "Gerar Império", deployBtn: "Implantar" },
  [Language.KOREAN]: { ...defaultEn, generateBtn: "제국 건설", deployBtn: "배포" },
  [Language.TAMIL]: { ...defaultEn },
  [Language.TELUGU]: { ...defaultEn },
  [Language.MARATHI]: { ...defaultEn },
};

export const getLabel = (lang: Language, key: LabelKey): string => {
  const dict = translations[lang] || defaultEn;
  // @ts-ignore
  return dict[key] || defaultEn[key];
};