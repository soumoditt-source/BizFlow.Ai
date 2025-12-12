import React, { useState } from 'react';
import { StartupPlan, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: StartupPlan;
  language: Language;
}

const DeploymentModal: React.FC<Props> = ({ isOpen, onClose, plan, language }) => {
  const [activeProvider, setActiveProvider] = useState<'vercel' | 'netlify' | 'firebase'>('vercel');
  
  if (!isOpen) return null;

  const handleLivePreview = () => {
    if (plan.livePrototypeHTML) {
       const blob = new Blob([plan.livePrototypeHTML], { type: 'text/html' });
       const url = URL.createObjectURL(blob);
       window.open(url, '_blank');
    } else {
      alert("Prototype compiling. Please wait.");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(plan, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `${plan.branding.name.replace(/\s+/g, '_')}_Architecture.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-4xl h-[80vh] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-dark-card border-r border-gray-800 p-6 flex flex-col">
          <h2 className="text-white font-bold text-lg mb-6">{getLabel(language, 'chooseDeployment')}</h2>
          
          <div className="space-y-3">
             <button 
               onClick={() => setActiveProvider('vercel')}
               className={`w-full p-4 rounded-xl border text-left transition-all ${activeProvider === 'vercel' ? 'bg-white text-black border-white' : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600'}`}
             >
                <div className="flex items-center justify-between mb-2">
                   <span className="font-bold">{getLabel(language, 'deployVercel')}</span>
                   {activeProvider === 'vercel' && <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{getLabel(language, 'recommended')}</span>}
                </div>
                <p className="text-xs opacity-70">{getLabel(language, 'instantScale')}</p>
             </button>

             <button 
               onClick={() => setActiveProvider('netlify')}
               className={`w-full p-4 rounded-xl border text-left transition-all ${activeProvider === 'netlify' ? 'bg-[#20c5ba] text-black border-[#20c5ba]' : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600'}`}
             >
                <div className="flex items-center justify-between mb-2">
                   <span className="font-bold">{getLabel(language, 'deployNetlify')}</span>
                </div>
                <p className="text-xs opacity-70">{getLabel(language, 'dragDrop')}</p>
             </button>

             <button 
               onClick={() => setActiveProvider('firebase')}
               className={`w-full p-4 rounded-xl border text-left transition-all ${activeProvider === 'firebase' ? 'bg-[#ffca28] text-black border-[#ffca28]' : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600'}`}
             >
                <div className="flex items-center justify-between mb-2">
                   <span className="font-bold">{getLabel(language, 'deployFirebase')}</span>
                </div>
                <p className="text-xs opacity-70">{getLabel(language, 'googleInfra')}</p>
             </button>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-800">
             <button 
               onClick={handleLivePreview}
               className="w-full py-3 bg-gradient-to-r from-bizflow-600 to-purple-600 hover:from-bizflow-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 mb-3 transition-transform hover:-translate-y-0.5"
             >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
               </svg>
               {getLabel(language, 'livePreview')}
             </button>
             <button 
               onClick={handleDownload}
               className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors text-sm"
             >
               {getLabel(language, 'downloadSource')} (.json)
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-black text-gray-300 font-mono text-sm leading-relaxed relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bizflow-500 via-purple-500 to-pink-500"></div>
           
           <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></span>
             {getLabel(language, 'deployingTo')} {activeProvider.toUpperCase()}
           </h3>

           {activeProvider === 'vercel' && (
             <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'step1')}: Install Vercel CLI</p>
                  <code className="block bg-black p-3 rounded text-green-400">$ npm i -g vercel</code>
                </div>
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'step2')}: Deploy Artifact</p>
                  <code className="block bg-black p-3 rounded text-green-400">
                    $ vercel deploy --prod
                  </code>
                  <p className="mt-2 text-xs text-gray-500">Note: Ensure API_KEY is set in Vercel Dashboard Settings.</p>
                </div>
                <div className="p-4 bg-white/5 rounded border border-white/10">
                   <h4 className="text-white font-bold mb-2">{getLabel(language, 'whyVercel')}</h4>
                   <p className="text-xs">{getLabel(language, 'whyVercelDesc')}</p>
                </div>
             </div>
           )}

           {activeProvider === 'netlify' && (
             <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'methodA')}: {getLabel(language, 'dragDrop')}</p>
                  <p>1. Run <code className="text-green-400">npm run build</code></p>
                  <p>2. Drag `dist` folder to <a href="https://app.netlify.com/drop" target="_blank" className="text-blue-400 underline">app.netlify.com/drop</a></p>
                </div>
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'methodB')}: CLI</p>
                  <code className="block bg-black p-3 rounded text-green-400">
                    $ npm i -g netlify-cli<br/>
                    $ netlify deploy --prod
                  </code>
                </div>
             </div>
           )}

           {activeProvider === 'firebase' && (
             <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'step1')}: Initialize</p>
                  <code className="block bg-black p-3 rounded text-green-400">
                    $ firebase login<br/>
                    $ firebase init hosting
                  </code>
                </div>
                <div className="bg-gray-900 p-4 rounded border border-gray-800">
                  <p className="text-white font-bold mb-2">{getLabel(language, 'step2')}: Deploy</p>
                  <code className="block bg-black p-3 rounded text-green-400">
                    $ npm run build<br/>
                    $ firebase deploy
                  </code>
                </div>
             </div>
           )}

           <div className="mt-8 pt-8 border-t border-gray-800">
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider">
                 {getLabel(language, 'cancelDeploy')}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentModal;