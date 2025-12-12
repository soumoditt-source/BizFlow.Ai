import React from 'react';
import { Language } from '../types';

interface Props {
  onClose: () => void;
  language: Language;
}

const TutorialModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-[#0a0a0a] border border-bizflow-500/30 rounded-xl max-w-2xl w-full shadow-[0_0_50px_rgba(20,184,166,0.1)] animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="bg-bizflow-900/20 border-b border-bizflow-500/20 p-4 md:p-6 flex justify-between items-center shrink-0">
            <h2 className="text-lg md:text-xl font-mono font-bold text-bizflow-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-bizflow-500 animate-pulse"></span>
                Protocol Initiation
            </h2>
            <div className="text-[10px] text-gray-500 font-mono hidden md:block">
                CLASSIFIED: EYES ONLY
            </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-4 md:p-8 space-y-6 overflow-y-auto">
           <div className="space-y-2">
             <h3 className="text-white font-bold text-lg">Welcome, Founder.</h3>
             <p className="text-gray-400 text-sm leading-relaxed">
                You have accessed the BizFlow AutoCEO Suite. This tool leverages advanced LLMs to autonomously architect entire corporations from a single text input.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-dark-card border border-gray-800 p-4 rounded-lg">
                  <h4 className="text-bizflow-400 font-mono text-xs uppercase mb-2">Capabilities</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">✓ Full Business Strategy</li>
                      <li className="flex items-center gap-2">✓ 5-Year Financial Models</li>
                      <li className="flex items-center gap-2">✓ Compliance & Legal Checks</li>
                      <li className="flex items-center gap-2">✓ <span className="text-white font-bold">Production Codebase</span></li>
                  </ul>
              </div>
              <div className="bg-dark-card border border-gray-800 p-4 rounded-lg">
                  <h4 className="text-red-400 font-mono text-xs uppercase mb-2">Protocol</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">1. Input Idea</li>
                      <li className="flex items-center gap-2">2. Analyze Blueprint</li>
                      <li className="flex items-center gap-2">3. <span className="text-white font-bold">DEPLOY (Mandatory)</span></li>
                      <li className="flex items-center gap-2">4. Receive Royalties Contract</li>
                  </ul>
              </div>
           </div>

           <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                 <h4 className="text-blue-300 font-bold text-sm">Instant Hosting Included</h4>
                 <p className="text-xs text-blue-200/70">
                    Upon deployment, you will receive a <span className="text-white">Live Prototype Link</span> running directly in your secure browser sandbox. No servers required.
                 </p>
              </div>
           </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 md:p-6 border-t border-gray-800 bg-gray-900/50 shrink-0">
           <button 
             onClick={onClose}
             className="w-full py-3 bg-bizflow-600 hover:bg-bizflow-500 text-white font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] rounded-lg text-sm md:text-base"
           >
             Acknowledge & Continue
           </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;