import React from 'react';
import { MVPCode } from '../types';

interface Props {
  data: MVPCode;
  isDeployed: boolean;
}

const CodeBlock: React.FC<{ title: string; code: string; lang: string; isSecret?: boolean }> = ({ title, code, lang, isSecret }) => (
  <div className={`bg-dark-card border ${isSecret ? 'border-amber-500/30' : 'border-bizflow-900/50'} rounded-xl overflow-hidden flex flex-col h-full shadow-lg`}>
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
    <div className="flex-1 overflow-auto max-h-[500px] relative group">
      <pre className="p-4 text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap selection:bg-bizflow-900 selection:text-white">
        {code}
      </pre>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Copy
      </button>
    </div>
  </div>
);

const SectionCode: React.FC<Props> = ({ data, isDeployed }) => {
  return (
    <div className="space-y-6">
      <div className="bg-bizflow-900/20 border border-bizflow-500/30 p-4 rounded-lg flex items-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-bizflow-400">
            <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
          </svg>
         <p className="text-sm text-bizflow-100">
           Production-ready architecture generated. {isDeployed ? <span className="text-green-400 font-bold">Deployment Active.</span> : "Ready for deployment."}
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeBlock title="Frontend (React/Vite)" code={data.frontendSnippet} lang="React/TSX" />
        <CodeBlock title="Backend (Node/Express)" code={data.backendSnippet} lang="TypeScript" />
      </div>

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

      {data.legalDoc && (
        <div className="animate-fade-in-up mt-8">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-amber-500 font-bold text-sm uppercase tracking-wider">Legal Framework</h3>
              <span className="text-[10px] text-gray-500">DIGITALLY SIGNED</span>
           </div>
           <CodeBlock 
             title="FOUNDERS_AGREEMENT.md" 
             code={data.legalDoc} 
             lang="Markdown"
             isSecret={true}
           />
        </div>
      )}
    </div>
  );
};

export default SectionCode;