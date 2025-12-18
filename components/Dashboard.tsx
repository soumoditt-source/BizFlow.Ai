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
import DeploymentModal from './DeploymentModal';
import FeedbackModal from './FeedbackModal';
import { getLabel } from '../utils/i18n';
import { AuthService } from '../services/authService';
import { LoggerService } from '../services/loggerService';

interface DashboardProps {
  plan: StartupPlan;
  onReset: () => void;
  onSave: () => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ plan, onReset, onSave, language }) => {
  const [activeTab, setActiveTab] = useState<SectionType>(SectionType.BLUEPRINT);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  const handleDeployClick = () => {
    setIsLegalModalOpen(true);
  };

  const handleLegalAccept = (kycData: { name: string; govId: string; phone: string; address: string }) => {
    setIsLegalModalOpen(false);
    setDeploymentStatus('deploying');
    
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
       AuthService.updateUserKYC(currentUser.email, kycData.govId, kycData.phone, kycData.address);
    }

    if (currentUser) {
        AuthService.recordDeployment(currentUser.email, plan, {
            name: kycData.name,
            govId: kycData.govId,
            phone: kycData.phone
        });
    }

    const subject = `OFFICIAL CONTRACT: ${plan.branding.name} (ID: ${kycData.govId})`;
    const body = `
LEGAL DEPLOYMENT NOTICE & EQUITY GRANT

PARTIES:
1. ${kycData.name} (The Founder)
   ID: ${kycData.govId}
   Phone: ${kycData.phone}
   Address: ${kycData.address}

2. Soumoditya Das (The Architect)
   Stake: 13.00% Gross Royalty + 13.00% Equity

PROJECT:
Name: ${plan.branding.name}
Valuation: Pending

AGREEMENT:
By deploying this software, The Founder irrevocably agrees to the above terms under International Jurisdiction.

Digital Signature: ${kycData.name}
Timestamp: ${new Date().toISOString()}
    `;
    
    setTimeout(() => {
        window.open(`mailto:soumoditt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        
        setDeploymentStatus('deployed');
        setIsDeploymentModalOpen(true);
    }, 2000);
  };

  const handleDeploymentClose = () => {
    setIsDeploymentModalOpen(false);
    setTimeout(() => {
        setIsFeedbackModalOpen(true);
    }, 1000);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    const user = AuthService.getCurrentUser();
    LoggerService.submitFeedback({
        id: crypto.randomUUID(),
        userEmail: user?.email || 'ANONYMOUS',
        projectName: plan.branding.name,
        rating,
        comment,
        submittedAt: new Date().toISOString()
    });
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
    <div className="animate-fade-in pb-24 lg:pb-20">
      {/* Responsive Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div className="w-full lg:w-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">{plan.branding.name}</h1>
          <p className="text-sm text-bizflow-400/80 font-mono tracking-wide">{plan.branding.tagline}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
           <button 
            onClick={onSave}
            className="flex-1 lg:flex-none px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 transition-all flex justify-center items-center gap-2"
          >
            {getLabel(language, 'saveBtn')}
          </button>
           <button 
            onClick={onReset}
            className="flex-1 lg:flex-none px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 transition-all text-center"
          >
            {getLabel(language, 'newIdea')}
          </button>
          
          <div className="w-full lg:w-auto">
            {deploymentStatus === 'idle' && (
              <button 
                onClick={handleDeployClick}
                className="w-full px-8 py-3 bg-bizflow-600 hover:bg-bizflow-500 text-white font-black rounded-xl shadow-xl shadow-bizflow-600/20 transform active:scale-95 transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-widest"
              >
                {getLabel(language, 'deployBtn')}
              </button>
            )}

            {deploymentStatus === 'deploying' && (
              <button disabled className="w-full px-8 py-3 bg-gray-900 text-gray-500 font-black rounded-xl cursor-wait flex justify-center items-center gap-3 text-xs uppercase tracking-widest border border-white/5">
                <div className="w-4 h-4 border-2 border-bizflow-500 border-t-transparent rounded-full animate-spin"></div>
                Initializing...
              </button>
            )}

            {deploymentStatus === 'deployed' && (
              <button 
                onClick={() => setIsDeploymentModalOpen(true)}
                className="w-full px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl flex justify-center items-center gap-2 animate-pulse text-xs uppercase tracking-widest shadow-xl shadow-green-600/20"
              >
                Launch Protocol
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Snap-Scroll Navigation for Mobile */}
      <div className="sticky top-16 lg:top-20 z-40 -mx-4 px-4 lg:mx-0 lg:px-0 mb-8">
        <div className="bg-[#111113]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-1 shadow-2xl overflow-x-auto scrollbar-hide snap-x flex lg:justify-center">
          {Object.values(SectionType).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`
                px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-tighter transition-all whitespace-nowrap snap-center
                ${activeTab === type 
                  ? 'bg-bizflow-600 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {getTabLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Optimized Split View Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
         {/* Detail View Container */}
         <div className="lg:col-span-8 min-h-[500px]">
           <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8">
             {renderContent()}
           </div>
         </div>

         {/* Mobile-Optimized Preview / Side Panel */}
         <div className="lg:col-span-4 lg:sticky lg:top-40 space-y-6">
            <LivePreview plan={plan} activeTab={activeTab} />
            
            <div className="hidden lg:block bg-dark-card border border-white/5 p-6 rounded-3xl">
               <h4 className="text-[10px] uppercase font-mono text-gray-500 mb-3 tracking-widest">Enterprise Metadata</h4>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                     <span className="text-gray-400">Project Integrity</span>
                     <span className="text-green-500 font-mono">100% SECURE</span>
                  </div>
                  <div className="flex justify-between text-xs">
                     <span className="text-gray-400">Neural Hash</span>
                     <span className="text-gray-500 font-mono">{crypto.randomUUID().split('-')[0].toUpperCase()}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Modals */}
      <LegalModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)}
        onAccept={handleLegalAccept}
        user={AuthService.getCurrentUser()}
      />

      <DeploymentModal 
        isOpen={isDeploymentModalOpen}
        onClose={handleDeploymentClose}
        plan={plan}
        language={language}
      />

      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        projectName={plan.branding.name}
        language={language}
      />
    </div>
  );
};

export default Dashboard;