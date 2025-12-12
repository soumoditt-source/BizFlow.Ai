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
          <div className="space-y-4 pt-10">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-[10px] uppercase text-gray-500 mb-1">Projected MRR</h4>
              <div className="text-3xl font-bold text-white">
                ${(plan.financials.projections[0].revenue / 12).toFixed(1)}k
              </div>
              <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[65%]"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <h4 className="text-[10px] uppercase text-gray-500 mb-1">CAC</h4>
                 <div className="text-lg font-bold text-white">{plan.financials.unitEconomics.cac}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <h4 className="text-[10px] uppercase text-gray-500 mb-1">LTV</h4>
                 <div className="text-lg font-bold text-green-400">{plan.financials.unitEconomics.ltv}</div>
              </div>
            </div>
          </div>
        );
      
      case SectionType.BRANDING:
        return (
          <div className="text-center space-y-6 flex flex-col items-center justify-center h-full">
            <div 
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl"
              style={{ backgroundColor: plan.branding.colors[0]?.hex || '#14b8a6', color: '#fff' }}
            >
              {plan.branding.name.charAt(0)}
            </div>
            <div className="space-y-1">
               <h3 className="text-xl font-bold text-white" style={{ fontFamily: plan.branding.typography.primary }}>{plan.branding.name}</h3>
               <p className="text-xs text-gray-400 font-light px-4" style={{ fontFamily: plan.branding.typography.secondary }}>{plan.branding.tagline}</p>
            </div>
            <div className="flex gap-2 mt-4">
              {plan.branding.colors.map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} title={c.name}></div>
              ))}
            </div>
          </div>
        );

      case SectionType.CODE:
        return (
           <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-[9px] text-gray-300 overflow-hidden relative h-full flex flex-col border border-white/5 mt-4">
              <div className="text-green-400 mb-2 font-bold">$ npm run deploy</div>
              <div className="opacity-70 space-y-1 flex-1">
                 <div>{`> Building ${plan.branding.name}...`}</div>
                 <div className="text-blue-400">{`> Optimizing assets...`}</div>
                 <div>{`> Pushing to Edge...`}</div>
                 <div className="text-white font-bold">✓ Deployed Successfully</div>
                 <br />
                 <div className="text-purple-400">Serving on port 3000...</div>
              </div>
           </div>
        );

      default: // Default Landing Page View
        return (
          <div className="space-y-6 h-full flex flex-col pt-8">
            {/* Hero */}
            <div className="space-y-3 mt-4">
              <h2 className="text-2xl font-black leading-tight tracking-tight text-white">
                {plan.branding.name}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                {plan.blueprint.usp}
              </p>
              <button 
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white w-full shadow-lg"
                style={{ backgroundColor: plan.branding.colors[0]?.hex || '#14b8a6' }}
              >
                Get Started
              </button>
            </div>

            {/* Feature Snippet */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-auto mb-4 backdrop-blur-md">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                 <span className="text-[9px] uppercase font-bold text-gray-500">Core Feature</span>
               </div>
               <p className="text-[10px] text-gray-300 line-clamp-3 leading-relaxed">
                 {plan.blueprint.solution}
               </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex justify-center perspective-[1000px]">
       <div className="relative w-[300px] h-[600px] bg-black border-[6px] border-[#1a1a1a] rounded-[40px] shadow-2xl overflow-hidden ring-1 ring-white/10">
         
         {/* Dynamic Island / Notch */}
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-28 bg-black rounded-b-xl z-50 flex items-center justify-center">
            <div className="w-16 h-4 bg-[#111] rounded-full flex items-center gap-2 px-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
               <div className="w-1 h-1 rounded-full bg-blue-900/50"></div>
            </div>
         </div>

         {/* Screen */}
         <div className="w-full h-full bg-[#050505] overflow-y-auto scrollbar-hide relative text-white">
            {/* Status Bar */}
            <div className="h-8 w-full flex justify-between items-center px-5 pt-2 text-[10px] font-medium text-white/90 z-40 relative">
               <span>9:41</span>
               <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.757a.75.75 0 00-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM4.343 5.757a.75.75 0 011.06-1.06l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06zM15.657 14.243a.75.75 0 01-1.06 1.06l-1.061-1.06a.75.75 0 011.06-1.06l1.06 1.06zM4.343 14.243a.75.75 0 001.06 1.06l1.061-1.06a.75.75 0 00-1.06-1.06l-1.06 1.06z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.25 0h-14.5v10.515c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.5a.25.25 0 00.25.25h2a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.5a.25.25 0 00.25.25h1.5a.25.25 0 00.25-.25V4.75z" clipRule="evenodd" /></svg>
               </div>
            </div>

            <div className="p-4 h-[calc(100%-40px)]">
               {renderPreviewContent()}
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
         </div>
         
         {/* Glossy Overlay */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
       </div>
    </div>
  );
};

export default LivePreview;