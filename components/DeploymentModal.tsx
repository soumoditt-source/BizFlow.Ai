import React, { useState, useEffect, useRef } from 'react';
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
  const [deployState, setDeployState] = useState<'idle' | 'building' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDeployState('idle');
      setLogs([]);
      setDeployedUrl(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!isOpen) return null;

  const handleSimulateDeploy = () => {
    setDeployState('building');
    setLogs([]);
    
    const steps = [
      `> Initiating ${activeProvider} build pipeline...`,
      "> Cloning repository...",
      "> Installing dependencies (React, Tailwind, Babel)...",
      "> Running 'npm run build'...",
      "> Optimizing static assets...",
      "> Verifying 'founders_agreement.md' signature...",
      "> Uploading build artifacts...",
      "> Configuring Edge Network...",
      `> Deployment Complete: ${plan.branding.name} is LIVE.`
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setDeployState('success');
        
        // Generate the Blob URL (The "Unlimited Wireframe" trick)
        if (plan.livePrototypeHTML) {
            const blob = new Blob([plan.livePrototypeHTML], { type: 'text/html' });
            setDeployedUrl(URL.createObjectURL(blob));
        }
      } else {
        setLogs(prev => [...prev, steps[stepIndex]]);
        stepIndex++;
      }
    }, 800);
  };

  const handleLivePreview = () => {
    if (deployedUrl) {
      window.open(deployedUrl, '_blank');
    } else if (plan.livePrototypeHTML) {
       const blob = new Blob([plan.livePrototypeHTML], { type: 'text/html' });
       const url = URL.createObjectURL(blob);
       window.open(url, '_blank');
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
               onClick={handleDownload}
               className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors text-sm"
             >
               {getLabel(language, 'downloadSource')} (.json)
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-8 flex flex-col bg-black relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bizflow-500 via-purple-500 to-pink-500"></div>
           
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <span className={`w-2 h-2 ${deployState === 'success' ? 'bg-green-500' : 'bg-amber-500'} animate-pulse rounded-full`}></span>
                {getLabel(language, 'deployingTo')} {activeProvider.toUpperCase()}
              </h3>
              {deployState === 'idle' && (
                <button 
                  onClick={handleSimulateDeploy}
                  className="px-6 py-2 bg-white text-black font-bold uppercase text-xs rounded hover:bg-gray-200 transition-colors"
                >
                  Start Deployment
                </button>
              )}
           </div>

           <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-4 font-mono text-xs overflow-y-auto font-light text-green-400/80 shadow-inner">
              {deployState === 'idle' ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-20">
                     <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                   </svg>
                   <p>Ready to deploy production build...</p>
                </div>
              ) : (
                <>
                  {logs.map((log, i) => (
                    <div key={i} className="mb-2">{log}</div>
                  ))}
                  {deployState === 'building' && (
                    <div className="animate-pulse">_</div>
                  )}
                  <div ref={logsEndRef} />
                </>
              )}
           </div>

           {deployState === 'success' && (
             <div className="mt-6 animate-fade-in-up">
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg flex items-center justify-between">
                   <div>
                      <h4 className="text-green-400 font-bold mb-1">Deployment Successful</h4>
                      <p className="text-xs text-green-200/50">Your prototype is live and scalable.</p>
                   </div>
                   <button 
                     onClick={handleLivePreview}
                     className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold uppercase rounded shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center gap-2 text-xs"
                   >
                     Visit Live Site
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                       <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                     </svg>
                   </button>
                </div>
             </div>
           )}

           <div className="mt-8 pt-6 border-t border-gray-800 text-right">
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider">
                 Close Terminal
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentModal;