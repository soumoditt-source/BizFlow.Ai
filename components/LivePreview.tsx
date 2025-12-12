import React from 'react';
import { StartupPlan, SectionType } from '../types';

interface Props {
  plan: StartupPlan;
  activeTab: SectionType;
}

const LivePreview: React.FC<Props> = ({ plan, activeTab }) => {
  // Helper to determine what to show based on tab
  const renderPreviewContent = () => {
    switch (activeTab) {
      case SectionType.FINANCIALS:
        return (
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="text-[10px] uppercase text-gray-400 mb-1">Projected MRR</h4>
              <div className="text-2xl font-bold text-green-400">
                ${(plan.financials.projections[0].revenue / 12).toFixed(1)}k
              </div>
              <div className="h-1 w-full bg-gray-700 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[40%] animate-pulse"></div>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
               <h4 className="text-[10px] uppercase text-gray-400 mb-1">Unit Economics</h4>
               <div className="flex justify-between text-xs">
                 <span>CAC: {plan.financials.unitEconomics.cac}</span>
                 <span className="text-green-400">LTV: {plan.financials.unitEconomics.ltv}</span>
               </div>
            </div>
          </div>
        );
      
      case SectionType.BRANDING:
        return (
          <div className="text-center space-y-4">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
              style={{ backgroundColor: plan.branding.colors[0]?.hex || '#14b8a6', color: '#fff' }}
            >
              {plan.branding.name.charAt(0)}
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-bold" style={{ fontFamily: plan.branding.typography.primary }}>{plan.branding.name}</h3>
               <p className="text-xs opacity-80" style={{ fontFamily: plan.branding.typography.secondary }}>{plan.branding.tagline}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {plan.branding.colors.map((c, i) => (
                <div key={i} className="h-8 rounded" style={{ backgroundColor: c.hex }}></div>
              ))}
            </div>
          </div>
        );

      case SectionType.CODE:
        return (
           <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-[10px] text-gray-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="text-green-400 mb-2">$ npm run deploy</div>
              <div className="opacity-50">
                 {`> Building ${plan.branding.name}...`} <br/>
                 {`> Optimizing assets...`} <br/>
                 {`> Pushing to Edge...`} <br/>
                 <span className="text-white">✓ Deployed Successfully</span>
              </div>
           </div>
        );

      default: // Default Landing Page View
        return (
          <div className="space-y-6">
            {/* Hero */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: plan.branding.colors[0]?.hex }}>
                {plan.branding.name}
              </h2>
              <p className="text-sm text-gray-300">
                {plan.blueprint.usp}
              </p>
              <button 
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold text-white w-full shadow-lg transform active:scale-95 transition-all"
                style={{ backgroundColor: plan.branding.colors[0]?.hex || '#14b8a6' }}
              >
                Get Started
              </button>
            </div>

            {/* Feature Snippet */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-[10px] uppercase font-bold text-gray-400">Core Solution</span>
               </div>
               <p className="text-xs text-gray-300 line-clamp-3">
                 {plan.blueprint.solution}
               </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="sticky top-24 w-full h-[600px] hidden xl:flex flex-col items-center justify-center [perspective:1000px] animate-fade-in">
      <div className="relative w-[320px] h-[640px] bg-gray-900 border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden [transform:rotateY(-12deg)] hover:[transform:rotateY(0deg)] transition-all duration-700 ease-out group">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-gray-950 overflow-y-auto scrollbar-hide relative z-10">
          
          {/* Status Bar */}
          <div className="h-8 w-full flex justify-between items-center px-6 text-[10px] text-white pt-2">
            <span>9:41</span>
            <div className="flex gap-1">
               <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
               <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
               <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Dynamic App Content */}
          <div className="p-6 pt-8">
            {renderPreviewContent()}
          </div>
          
          {/* Bottom Context Indicator */}
          <div className="absolute bottom-6 left-0 w-full text-center">
             <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold bg-gray-900/80 px-3 py-1 rounded-full border border-gray-800">
               Live Preview: {activeTab}
             </span>
          </div>
        </div>

        {/* Reflection */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30"></div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-bizflow-400 font-mono animate-pulse">
           ● SYNCHRONIZED WITH NEURAL CORE
        </p>
      </div>
    </div>
  );
};

export default LivePreview;