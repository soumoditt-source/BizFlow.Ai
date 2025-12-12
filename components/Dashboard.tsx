import React, { useState } from 'react';
import { StartupPlan, SectionType, Language } from '../types';
import SectionBlueprint from './SectionBlueprint';
import SectionFinancials from './SectionFinancials';
import SectionBrand from './SectionBrand';
import SectionProduct from './SectionProduct';
import SectionCode from './SectionCode';
import SectionPitch from './SectionPitch';
import SectionGTM from './SectionGTM';
import SectionCompliance from './SectionCompliance';
import LegalModal from './LegalModal';
import LivePreview from './LivePreview'; 
import { getLabel } from '../utils/i18n';
import { AuthService } from '../services/authService';

interface DashboardProps {
  plan: StartupPlan;
  onReset: () => void;
  onSave: () => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ plan, onReset, onSave, language }) => {
  const [activeTab, setActiveTab] = useState<SectionType>(SectionType.BLUEPRINT);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');
  const [liveUrl, setLiveUrl] = useState<string | null>(null);

  const handleDeployClick = () => {
    setIsLegalModalOpen(true);
  };

  const handleLegalAccept = () => {
    setIsLegalModalOpen(false);
    setDeploymentStatus('deploying');
    
    // 1. Record in Ledger
    const user = AuthService.getCurrentUser();
    if (user) {
        AuthService.recordDeployment(user.email, plan);
    }

    // 2. Generate "Free Hosting" Link (Blob URL)
    const generateLiveLink = () => {
       const htmlContent = `
         <!DOCTYPE html>
         <html>
         <head>
            <title>${plan.branding.name} - MVP</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>body { background-color: #0f172a; color: white; font-family: sans-serif; }</style>
         </head>
         <body>
            <div id="app" class="p-10 flex flex-col items-center justify-center min-h-screen text-center">
               <h1 class="text-5xl font-bold text-teal-400 mb-4">${plan.branding.name}</h1>
               <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">${plan.branding.tagline}</p>
               <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-3xl w-full mx-auto shadow-2xl">
                  <h2 class="text-2xl font-bold mb-4 text-white">Core Solution</h2>
                  <p class="mb-8 text-gray-300 leading-relaxed">${plan.blueprint.solution}</p>
                  <button class="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
                    Request Early Access
                  </button>
               </div>
               <div class="mt-12 text-xs text-gray-500 font-mono">
                  SECURE DEPLOYMENT ID: ${crypto.randomUUID()}
               </div>
            </div>
         </body>
         </html>
       `;
       const blob = new Blob([htmlContent], { type: 'text/html' });
       return URL.createObjectURL(blob);
    };

    setTimeout(() => {
      setDeploymentStatus('deployed');
      setActiveTab(SectionType.CODE);
      setLiveUrl(generateLiveLink());
      
      // 3. Trigger Email Client
      const subject = `BIZFLOW DEPLOYMENT: ${plan.branding.name}`;
      const body = `Deployment Report for ${plan.branding.name}.\n\nStakeholder: Soumoditya Das (13%)\nUser: ${user?.email}\n\n[Contract Attached in System]`;
      window.open(`mailto:soumoditt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

    }, 3000);
  };

  const getTabLabel = (type: SectionType) => {
    switch (type) {
        case SectionType.BLUEPRINT: return getLabel(language, 'tabBlueprint');
        case SectionType.FINANCIALS: return getLabel(language, 'tabFinancials');
        case SectionType.BRANDING: return getLabel(language, 'tabBranding');
        case SectionType.PRODUCT: return getLabel(language, 'tabProduct');
        case SectionType.CODE: return getLabel(language, 'tabCode');
        case SectionType.PITCH: return getLabel(language, 'tabPitch');
        case SectionType.GTM: return getLabel(language, 'tabGTM');
        case SectionType.COMPLIANCE: return getLabel(language, 'complianceTitle');
        default: return type;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case SectionType.BLUEPRINT: return <SectionBlueprint data={plan.blueprint} language={language} />;
      case SectionType.FINANCIALS: return <SectionFinancials data={plan.financials} language={language} />;
      case SectionType.BRANDING: return <SectionBrand data={plan.branding} language={language} />;
      case SectionType.PRODUCT: return <SectionProduct data={plan.product} language={language} />;
      case SectionType.CODE: return <SectionCode data={plan.code} isDeployed={deploymentStatus === 'deployed'} />;
      case SectionType.PITCH: return <SectionPitch slides={plan.pitchDeck} language={language} />;
      case SectionType.GTM: return <SectionGTM data={plan.gtm} language={language} />;
      case SectionType.COMPLIANCE: return <SectionCompliance data={plan.compliance} language={language} />;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">{plan.branding.name}</h1>
          <p className="text-xl text-bizflow-400 font-medium">{plan.branding.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <button 
            onClick={onSave}
            className="px-5 py-2.5 bg-dark-card hover:bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-bizflow-300 transition-colors flex items-center gap-2"
          >
            {getLabel(language, 'saveBtn')}
          </button>
           <button 
            onClick={onReset}
            className="px-5 py-2.5 bg-dark-card hover:bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 transition-colors"
          >
            {getLabel(language, 'newIdea')}
          </button>
          
          {deploymentStatus === 'idle' && (
            <button 
              onClick={handleDeployClick}
              className="px-6 py-2.5 bg-gradient-to-r from-bizflow-600 to-purple-600 hover:from-bizflow-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(94,234,212,0.3)] transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              {getLabel(language, 'deployBtn')}
            </button>
          )}

          {deploymentStatus === 'deploying' && (
             <button disabled className="px-6 py-2.5 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-wait flex items-center gap-2">
               <svg className="animate-spin h-5 w-5 text-bizflow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Signing Contracts...
             </button>
          )}

          {deploymentStatus === 'deployed' && liveUrl && (
             <a 
               href={liveUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center gap-2 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]"
             >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
               </svg>
               LAUNCH PROTOTYPE
             </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-8 overflow-x-auto scrollbar-hide">
        <nav className="flex space-x-2 md:space-x-8 min-w-max pb-1">
          {Object.values(SectionType).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`
                py-4 px-2 border-b-2 font-medium text-sm transition-all whitespace-nowrap
                ${activeTab === type 
                  ? 'border-bizflow-500 text-bizflow-400 shadow-[0_1px_0_0_#14b8a6]' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                }
              `}
            >
              {getTabLabel(type)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Left: Detail View */}
         <div className="xl:col-span-7 min-h-[500px]">
           {renderContent()}
         </div>

         {/* Right: Live Preview */}
         <div className="xl:col-span-5 relative">
            <LivePreview plan={plan} activeTab={activeTab} />
         </div>
      </div>

      <LegalModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)}
        onAccept={handleLegalAccept}
      />
    </div>
  );
};

export default Dashboard;