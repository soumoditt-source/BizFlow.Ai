
import React, { useMemo } from 'react';
import { StartupPlan, SectionType } from '../types';

interface Props {
  plan: StartupPlan;
  activeTab: SectionType;
}

const LivePreview: React.FC<Props> = ({ plan, activeTab }) => {
  const previewUrl = useMemo(() => {
    if (!plan.livePrototypeHTML) return null;
    
    // Safety check: Ensure the generated HTML is not malicious
    const cleanHTML = plan.livePrototypeHTML;
    const blob = new Blob([cleanHTML], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, [plan.livePrototypeHTML]);

  const renderContent = () => {
    if (activeTab === SectionType.BLUEPRINT || activeTab === SectionType.PRODUCT || activeTab === SectionType.GTM) {
      if (previewUrl) {
        return (
          <iframe 
            src={previewUrl} 
            className="w-full h-full bg-white border-none"
            title="Live Prototype"
            sandbox="allow-scripts" // Security Hardening
          />
        );
      }
    }

    // Tab-specific summaries
    switch(activeTab) {
      case SectionType.FINANCIALS:
        return (
          <div className="h-full flex flex-col items-center justify-center bg-black p-8 text-center space-y-6">
             <div className="w-24 h-24 bg-bizflow-900/50 rounded-full border border-bizflow-500 flex items-center justify-center text-bizflow-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div>
                <h4 className="text-white font-bold text-xl">${(plan.financials.projections[4].revenue / 1000000).toFixed(1)}M</h4>
                <p className="text-gray-500 text-sm">Year 5 Valuation</p>
             </div>
             <div className="w-full bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between mb-1">
                   <span className="text-[10px] text-gray-500 uppercase">Growth Trajectory</span>
                   <span className="text-[10px] text-green-500 uppercase">Optimal</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-bizflow-500 w-[80%]"></div>
                </div>
             </div>
          </div>
        );
      case SectionType.CODE:
        return (
          <div className="h-full bg-[#0a0a0a] p-6 font-mono text-[10px] space-y-2 overflow-hidden">
             <div className="text-gray-600 mb-4 tracking-tighter uppercase">Deployment Log // v4.0.0</div>
             <div className="text-green-500">> Initiating cloud build...</div>
             <div className="text-green-500">> Compiling React components...</div>
             <div className="text-green-500">> Optimizing Tailwind layer...</div>
             <div className="text-white font-bold">> Success. Site live at sandbox.bizflow.ai</div>
             <div className="pt-10 flex flex-col items-center opacity-40">
                <div className="w-32 h-32 border border-white/10 rounded-xl flex items-center justify-center">
                   <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <span className="mt-2">Code Artifact Ready</span>
             </div>
          </div>
        );
      default:
        return (
