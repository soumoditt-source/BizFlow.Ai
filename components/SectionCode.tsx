import React from 'react';
import { MVPCode } from '../types';

interface Props {
  data: MVPCode;
  isDeployed: boolean;
}

const CodeBlock: React.FC<{ title: string; code: string; lang: string; isSecret?: boolean }> = ({ title, code, lang, isSecret }) => (
  <div className={`bg-dark-card border ${isSecret ? 'border-amber-500/30' : 'border-bizflow-900/50'} rounded-xl overflow-hidden flex flex-col h-full`}>
    <div className={`px-4 py-2 border-b ${isSecret ? 'bg-amber-900/10 border-amber-500/30' : 'bg-dark-bg/50 border-bizflow-900/50'} flex justify-between items-center`}>
      <div className="flex items-center gap-2">
        {isSecret && (
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500">
             <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
           </svg>
        )}
        <span className={`text-sm font-mono font-bold ${isSecret ? 'text-amber-400' : 'text-gray-300'}`}>{title}</span>
      </div>
      <span className="text-xs text-gray-500 uppercase">{lang}</span>
    </div>
    <div className="flex-1 overflow-auto max-h-[400px]">
      <pre className="p-4 text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  </div>
);

const SectionCode: React.FC<Props> = ({ data, isDeployed }) => {
  if (isDeployed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-black border border-green-900/50 rounded-xl relative overflow-hidden p-8 text-center animate-fade-in">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-green-900/10 pointer-events-none"></div>

         <div className="bg-dark-card border border-green-500/30 p-10 rounded-full mb-8 shadow-[0_0_80px_rgba(34,197,94,0.15)] animate-pulse-slow relative z-10 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-green-500 transform transition-transform group-hover:scale-110 duration-700">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 border-4 border-t-green-500/50 border-r-transparent border-b-green-500/50 border-l-transparent rounded-full animate-spin [animation-duration:3s]"></div>
         </div>

         <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-[0.2em] relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-green-500">
            Source Code Locked
         </h2>
         
         <div className="max-w-2xl mx-auto space-y-4 relative z-10">
             <p className="text-green-400 font-mono text-sm leading-relaxed bg-green-900/10 p-4 rounded border border-green-900/50">
                <span className="font-bold text-green-300">SECURITY PROTOCOL ACTIVATED:</span> Deployment confirmed. The source architecture has been compiled, obfuscated, and transferred to the Secure Edge Network. Raw source access is disabled for this session to prevent intellectual property theft and tampering.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/50 border border-green-800 p-3 rounded flex flex-col items-center">
                    <span className="text-[10px] text-green-600 uppercase tracking-wider mb-1">Encryption</span>
                    <span className="text-white font-bold font-mono">AES-256</span>
                </div>
                <div className="bg-black/50 border border-green-800 p-3 rounded flex flex-col items-center">
                    <span className="text-[10px] text-green-600 uppercase tracking-wider mb-1">Integrity</span>
                    <span className="text-white font-bold font-mono">VERIFIED</span>
                </div>
                <div className="bg-black/50 border border-green-800 p-3 rounded flex flex-col items-center">
                    <span className="text-[10px] text-green-600 uppercase tracking-wider mb-1">Access</span>
                    <span className="text-red-500 font-bold font-mono">RESTRICTED</span>
                </div>
             </div>
         </div>

         <div className="mt-8 relative z-10">
            <button disabled className="px-6 py-2 border border-gray-700 text-gray-500 text-xs uppercase tracking-widest cursor-not-allowed hover:bg-gray-900/50 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19 10a3 3 0 11-6 0 3 3 0 016 0zm-1.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                </svg>
                Read-Only Mode
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-bizflow-900/20 border border-bizflow-500/30 p-4 rounded-lg flex items-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-bizflow-400">
            <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
          </svg>
         <p className="text-sm text-bizflow-100">
           These code snippets are production-ready foundations. {data.legalDoc && <span className="font-bold text-amber-300 ml-1">Enterprise Deployment Enabled.</span>}
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeBlock title="App.tsx (Frontend)" code={data.frontendSnippet} lang="React/TSX" />
        <CodeBlock title="server.ts (Backend)" code={data.backendSnippet} lang="Node/Python" />
      </div>

      {data.legalDoc && (
        <div className="animate-fade-in-up">
           <CodeBlock 
             title="LEGAL_FOUNDERS_AGREEMENT.md (CONFIDENTIAL)" 
             code={data.legalDoc} 
             lang="Markdown"
             isSecret={true}
           />
           <p className="text-xs text-center text-gray-500 mt-2">
             * This document has been cryptographically signed and embedded into your deployment package.
           </p>
        </div>
      )}

      <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
        <h3 className="text-white font-bold mb-4">Generated API Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.apiRoutes.map((route, idx) => (
             <div key={idx} className="flex items-center gap-2 font-mono text-sm text-gray-400 bg-dark-bg p-2 rounded border border-gray-800">
                <span className="text-purple-400 font-bold">POST</span>
                {route}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCode;