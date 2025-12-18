import React from 'react';
import { Language } from '../types';

interface Props {
  onClose: () => void;
  language: Language;
}

const TutorialModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-[#0a0a0a] border border-bizflow-500/30 rounded-2xl max-w-2xl w-full shadow-2xl animate-fade-in-up flex flex-col max-h-[92vh]">
        {/* Header - Fixed */}
        <div className="bg-bizflow-900/20 border-b border-bizflow-500/20 p-5 md:p-6 flex justify-between items-center shrink-0">
            <h2 className="text-base md:text-xl font-mono font-bold text-bizflow-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-bizflow-500 animate-pulse rounded-full"></span>
                Protocol Initiation
            </h2>
            <div className="text-[10px] text-gray-500 font-mono hidden md:block">
                VERSION: 3.2.0_SECURE
            </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-5 md:p-8 space-y-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
           <div className="space-y-3">
             <h3 className="text-white font-bold text-xl">Welcome, Founder.</h3>
             <p className="text-gray-400 text-sm leading-relaxed">
                You have accessed the BizFlow AutoCEO Suite. This tool leverages advanced LLMs to autonomously architect entire corporations from a single text input.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-card border border-white/5 p-4 rounded-xl">
                  <h4 className="text-bizflow-400 font-mono text-[10px] uppercase mb-3 tracking-widest">System Capabilities</h4>
                  <ul className="text-sm text-gray-300 space-y-2.5">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Full Business Strategy
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        5-Year Financial Models
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Production Codebase
                      </li>
                  </ul>
              </div>
              <div className="bg-dark-card border border-white/5 p-4 rounded-xl">
                  <h4 className="text-red-400 font-mono text-[10px] uppercase mb-3 tracking-widest">Workflow Protocol</h4>
                  <ul className="text-sm text-gray-300 space-y-2.5">
                      <li className="flex items-center gap-2 font-mono text-xs">01. Seed Idea</li>
                      <li className="flex items-center gap-2 font-mono text-xs">02. Blueprint Review</li>
                      <li className="flex items-center gap-2 font-mono text-xs font-bold text-white underline decoration-bizflow-500 underline-offset-4">03. MANDATORY DEPLOY</li>
                  </ul>
              </div>
           </div>

           <div className="bg-bizflow-500/5 border border-bizflow-500/10 p-5 rounded-xl flex flex-col md:flex-row gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-bizflow-900/50 flex items-center justify-center text-bizflow-400 shrink-0 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                 <h4 className="text-white font-bold text-sm">Instant Cloud Sandbox</h4>
                 <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Every startup generated receives a <span className="text-bizflow-400 font-medium">Live Prototype Link</span> running on our secure edge network.
                 </p>
              </div>
           </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-5 md:p-6 border-t border-white/5 bg-black/40 shrink-0">
           <button 
             onClick={onClose}
             className="w-full py-4 bg-bizflow-600 hover:bg-bizflow-500 text-white font-bold uppercase tracking-widest transition-all rounded-xl text-sm shadow-xl shadow-bizflow-600/10"
           >
             Acknowledge & Continue
           </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;