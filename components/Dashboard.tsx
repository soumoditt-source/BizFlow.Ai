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
    <div className="animate-fade-in pb-20">
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">{plan.branding.name}</h1>
          <p className="text-sm text-gray-400 font-mono">{plan.branding.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full xl:w-auto">
           <button 
            onClick={onSave}
            className="flex-1 xl:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-gray-300 transition-colors flex justify-center items-center gap-2"
          >
            {getLabel(language, 'saveBtn')}
          </button>
           <button 
            onClick={onReset}
            className="flex-1 xl:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-gray-300 transition-colors text-center"
          >
            {getLabel(language, 'newIdea')}
          </button>
          
          {deploymentStatus === 'idle' && (
            <button 
              onClick={handleDeployClick}
              className="w-full xl:w-auto px-6 py-2 bg-bizflow-600 hover:bg-bizflow-500 text-white font-bold rounded-md shadow-lg transform hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-wide"
            >
              {getLabel(language, 'deployBtn')}
            </button>
          )}

          {deploymentStatus === 'deploying' && (
             <button disabled className="w-full xl:w-auto px-6 py-2 bg-gray-800 text-gray-400 font-bold rounded-md cursor-wait flex justify-center items-center gap-2 text-xs uppercase tracking-wide">
               <svg className="animate-spin h-4 w-4 text-bizflow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               {getLabel(language, 'signing')}
             </button>
          )}

          {deploymentStatus === 'deployed' && (
             <button 
               onClick={() => setIsDeploymentModalOpen(true)}
               className="w-full xl:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md flex justify-center items-center gap-2 animate-pulse text-xs uppercase tracking-wide"
             >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
               </svg>
               {getLabel(language, 'launchBtn')}
             </button>
          )}
        </div>
      </div>

      {/* Toolbar / Tabs (Mobile Scrollable) */}
      <div className="flex justify-start md:justify-center mb-8 sticky top-16 md:top-20 z-40 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex bg-[#1e1e1e] border border-white/10 rounded-xl md:rounded-full p-1 shadow-2xl backdrop-blur-md overflow-x-auto max-w-full scrollbar-hide">
          {Object.values(SectionType).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`
                px-4 py-2 rounded-lg md:rounded-full font-medium text-xs transition-all whitespace-nowrap
                ${activeTab === type 
                  ? 'bg-bizflow-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {getTabLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
         {/* Left: Detail View */}
         <div className="xl:col-span-8 min-h-[500px]">
           {renderContent()}
         </div>

         {/* Right: Live Preview - Hidden on Mobile, Visible on XL */}
         <div className="xl:col-span-4 relative hidden xl:block">
            <div className="sticky top-32">
              <LivePreview plan={plan} activeTab={activeTab} />
            </div>
         </div>
      </div>

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