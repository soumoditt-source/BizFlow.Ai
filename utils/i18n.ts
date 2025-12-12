import { Language } from '../types';

const defaultEn = {
  // General
  inputPlaceholder: "e.g., An Uber for dog walkers with real-time GPS tracking...",
  generateBtn: "Generate Empire",
  architecting: "Architecting...",
  deployBtn: "Deploy & Incorporate",
  saveBtn: "Save to Vault",
  newIdea: "Reset System",
  loginTitle: "BizFlow Command Login",
  loginBtn: "Access Terminal",
  signupBtn: "Create Secure ID",
  tutorialTitle: "Protocol Initiation",
  adminPanel: "Admin Overwatch",
  complianceTitle: "Regulatory Scan",
  
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
    deployBtn: "ডিপ্লয় ও শুরু করুন",
    saveBtn: "ভল্টে সেভ করুন",
    newIdea: "রিসেট",
    loginTitle: "বিজফ্লো কমান্ড লগইন",
    loginBtn: "টার্মিনাল প্রবেশ",
    complianceTitle: "আইনি স্ক্যান",
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
    exportPng: "PNG এক্সপোর্ট",
    exportPdf: "PDF এক্সপোর্ট"
  },
  [Language.HINDI]: {
    ...defaultEn,
    inputPlaceholder: "उदाहरण के लिए, एक ऑनलाइन डिलीवरी व्यवसाय...",
    generateBtn: "साम्राज्य बनाएँ",
    architecting: "निर्माण जारी...",
    deployBtn: "तैनात करें",
    saveBtn: "सहेजें",
    tabBlueprint: "खाका",
    tabFinancials: "वित्तीय",
    tabBranding: "ब्रांडिंग",
    tabProduct: "उत्पाद",
    problem: "समस्या",
    solution: "समाधान",
    revenue: "राजस्व",
    profit: "लाभ"
  },
  [Language.SPANISH]: {
    ...defaultEn,
    inputPlaceholder: "Ej. Un Uber para paseadores de perros...",
    generateBtn: "Generar Imperio",
    deployBtn: "Desplegar",
    saveBtn: "Guardar",
    tabBlueprint: "Plano",
    tabFinancials: "Finanzas",
    tabBranding: "Marca",
    tabProduct: "Producto",
    tabPitch: "Presentación",
    problem: "Problema",
    solution: "Solución",
    revenue: "Ingresos",
    profit: "Beneficio",
    exportPng: "Exportar PNG",
    exportPdf: "Exportar PDF"
  },
  [Language.FRENCH]: { 
     ...defaultEn, 
     generateBtn: "Générer l'Empire", 
     deployBtn: "Déployer",
     tabBlueprint: "Plan",
     tabFinancials: "Finances",
     problem: "Problème",
     solution: "Solution"
  },
  [Language.GERMAN]: { 
     ...defaultEn, 
     generateBtn: "Imperium Generieren", 
     deployBtn: "Einsetzen",
     tabBlueprint: "Blaupause",
     tabFinancials: "Finanzen",
     problem: "Problem",
     solution: "Lösung"
  },
  [Language.CHINESE]: { 
     ...defaultEn, 
     generateBtn: "建立帝国", 
     deployBtn: "部署", 
     tabBlueprint: "蓝图",
     tabFinancials: "财务",
     problem: "问题",
     solution: "解决方案"
  },
  [Language.JAPANESE]: { 
     ...defaultEn, 
     generateBtn: "帝国を築く", 
     deployBtn: "展開する",
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