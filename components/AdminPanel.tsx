import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/authService';
import { DeploymentRecord } from '../types';
import { generateMarketingAsset } from '../services/geminiService';

interface Props {
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ onClose }) => {
  const [ledger, setLedger] = useState<DeploymentRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'ledger' | 'protocols' | 'press'>('ledger');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    setLedger(AuthService.getGlobalLedger());
  }, []);

  const totalRoyalty = ledger.length * 1000; // Simulated Value

  const handleGeneratePressKit = async () => {
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
      // Use the most recent project name or default
      const brandName = ledger.length > 0 ? ledger[ledger.length - 1].projectName : "BizFlow AutoCEO";
      const image = await generateMarketingAsset(brandName);
      setGeneratedImage(image);
    } catch (e) {
      console.error(e);
      alert("Asset generation failed. Ensure API key supports image generation.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-4 md:p-10 overflow-auto">
      <div className="max-w-7xl mx-auto border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.2)] bg-black/90 p-6 rounded-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-green-900 pb-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-widest text-green-400 drop-shadow-lg">Supreme Architect Console</h1>
            <p className="text-xs text-green-700">USER: SOUMODITYA DAS | ID: ROOT | ACCESS: UNRESTRICTED</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 border border-green-700 hover:bg-green-900/50 text-xs uppercase">
            Terminate Session
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-sm uppercase font-bold border ${activeTab === 'ledger' ? 'bg-green-900/30 border-green-500 text-green-300' : 'border-transparent text-green-800'}`}
          >
            Live Ledger
          </button>
          <button 
            onClick={() => setActiveTab('protocols')}
            className={`px-4 py-2 text-sm uppercase font-bold border ${activeTab === 'protocols' ? 'bg-green-900/30 border-green-500 text-green-300' : 'border-transparent text-green-800'}`}
          >
            Production Protocols
          </button>
          <button 
            onClick={() => setActiveTab('press')}
            className={`px-4 py-2 text-sm uppercase font-bold border ${activeTab === 'press' ? 'bg-green-900/30 border-green-500 text-green-300' : 'border-transparent text-green-800'}`}
          >
            Press Kit Generator
          </button>
        </div>

        {activeTab === 'ledger' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               <div className="bg-green-900/10 border border-green-800 p-4">
                  <div className="text-xs text-green-600 uppercase">Deployed Entities</div>
                  <div className="text-4xl font-bold">{ledger.length}</div>
               </div>
               <div className="bg-green-900/10 border border-green-800 p-4">
                  <div className="text-xs text-green-600 uppercase">Projected Stake Value</div>
                  <div className="text-4xl font-bold">${totalRoyalty.toLocaleString()}</div>
               </div>
               <div className="bg-green-900/10 border border-green-800 p-4">
                  <div className="text-xs text-green-600 uppercase">Royalty Rate</div>
                  <div className="text-4xl font-bold text-amber-400">13%</div>
                  <div className="text-[10px] text-amber-600">IRREVOCABLE</div>
               </div>
               <div className="bg-green-900/10 border border-green-800 p-4">
                  <div className="text-xs text-green-600 uppercase">System Status</div>
                  <div className="text-4xl font-bold text-green-400 animate-pulse">LIVE</div>
               </div>
            </div>

            {/* The Ledger */}
            <div className="bg-black border border-green-800 rounded-lg overflow-hidden">
               <div className="bg-green-900/20 px-4 py-2 border-b border-green-800 flex justify-between items-center">
                 <h3 className="uppercase tracking-wider font-bold text-sm">Global Deployment Ledger</h3>
                 <span className="text-[10px] animate-pulse">RECEIVING TELEMETRY...</span>
               </div>
               <table className="w-full text-left text-xs">
                 <thead className="bg-green-900/10 text-green-300">
                   <tr>
                     <th className="p-3">Deployment ID</th>
                     <th className="p-3">Project Name</th>
                     <th className="p-3">Founder Email</th>
                     <th className="p-3">Deployed At</th>
                     <th className="p-3">Contract Hash</th>
                     <th className="p-3 text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-green-900/30">
                   {ledger.length === 0 ? (
                     <tr>
                       <td colSpan={6} className="p-8 text-center text-green-800 italic">No entities deployed yet. Waiting for signals...</td>
                     </tr>
                   ) : (
                     ledger.map((rec) => (
                       <tr key={rec.id} className="hover:bg-green-900/10 transition-colors">
                         <td className="p-3 font-mono text-green-600">{rec.id.substring(0,8)}...</td>
                         <td className="p-3 font-bold text-white">{rec.projectName}</td>
                         <td className="p-3">{rec.userEmail}</td>
                         <td className="p-3">{new Date(rec.deployedAt).toLocaleString()}</td>
                         <td className="p-3 font-mono text-[10px] text-green-700">{rec.contractHash.substring(0,15)}...</td>
                         <td className="p-3 text-right text-green-400 font-bold">ACTIVE</td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
            </div>
          </>
        )}

        {activeTab === 'protocols' && (
          <div className="space-y-6">
            <h2 className="text-xl text-green-400 font-bold uppercase border-b border-green-800 pb-2">Production Extraction Protocol</h2>
            
            <div className="bg-black border border-green-800 p-6 rounded-lg">
               <h3 className="text-green-300 font-bold mb-4">Step 1: Containerization</h3>
               <p className="text-green-700 text-sm mb-2">Execute to wrap current state into Docker image.</p>
               <pre className="bg-green-900/20 p-4 text-xs text-green-300 overflow-x-auto">
{`docker build -t bizflow-auto-ceo:v3 .
docker run -p 3000:3000 bizflow-auto-ceo:v3`}
               </pre>
            </div>

            <div className="bg-black border border-green-800 p-6 rounded-lg">
               <h3 className="text-green-300 font-bold mb-4">Step 2: Vercel Deployment</h3>
               <p className="text-green-700 text-sm mb-2">Push current artifact to Edge Network.</p>
               <pre className="bg-green-900/20 p-4 text-xs text-green-300 overflow-x-auto">
{`npm i -g vercel
vercel login
vercel deploy --prod --env API_KEY=$GEMINI_API_KEY`}
               </pre>
            </div>
          </div>
        )}

        {activeTab === 'press' && (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-black border border-green-800 p-6 rounded-lg text-center">
                <h2 className="text-2xl text-green-400 font-bold uppercase mb-4">Autonomous Marketing Agent</h2>
                <p className="text-green-700 text-sm mb-6 max-w-xl mx-auto">
                  Utilizes Gemini 3 Pro (Imagen 3) to generate high-fidelity, 8K resolution promotional assets for the Kaggle submission and Press Release distribution.
                </p>
                
                <button 
                  onClick={handleGeneratePressKit}
                  disabled={isGeneratingImage}
                  className={`px-8 py-4 font-bold text-black uppercase tracking-widest rounded-full transition-all ${isGeneratingImage ? 'bg-green-900 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105'}`}
                >
                  {isGeneratingImage ? 'Synthesizing Visuals...' : 'Generate 8K Thumbnail'}
                </button>

                {generatedImage && (
                  <div className="mt-8 space-y-4">
                    <div className="border-4 border-green-900 rounded-lg overflow-hidden shadow-2xl inline-block max-w-2xl">
                       <img src={generatedImage} alt="Generated Asset" className="w-full" />
                    </div>
                    <div className="flex justify-center gap-4">
                       <a 
                         href={generatedImage} 
                         download="BizFlow_Press_Asset.png"
                         className="px-6 py-2 border border-green-500 text-green-400 text-xs uppercase font-bold rounded hover:bg-green-900/50"
                       >
                         Download PNG
                       </a>
                    </div>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;