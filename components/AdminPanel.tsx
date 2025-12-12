import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/authService';
import { LoggerService } from '../services/loggerService';
import { DeploymentRecord, AuditLog, UserFeedback } from '../types';
import { generateMarketingAsset } from '../services/geminiService';

interface Props {
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ onClose }) => {
  const [ledger, setLedger] = useState<DeploymentRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  
  const [activeTab, setActiveTab] = useState<'ledger' | 'telemetry' | 'feedback' | 'protocols' | 'press'>('ledger');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    setLedger(AuthService.getGlobalLedger());
    setAuditLogs(LoggerService.getLogs());
    setFeedback(LoggerService.getFeedback());
  }, []);

  const totalRoyalty = ledger.length * 1000; 

  const handleGeneratePressKit = async () => {
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
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
      <div className="max-w-7xl mx-auto border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.2)] bg-black/90 p-6 rounded-xl min-h-[80vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-green-900 pb-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-widest text-green-400 drop-shadow-lg">Supreme Architect Console</h1>
            <p className="text-xs text-green-700">USER: SOUMODITYA DAS | ID: ROOT | ACCESS: UNRESTRICTED</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 border border-green-700 hover:bg-green-900/50 text-xs uppercase transition-colors">
            Terminate Session
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-6">
          {['ledger', 'telemetry', 'feedback', 'protocols', 'press'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm uppercase font-bold border transition-colors ${activeTab === tab ? 'bg-green-900/30 border-green-500 text-green-300' : 'border-transparent text-green-800 hover:border-green-800'}`}
            >
              {tab === 'ledger' ? 'Live Ledger' : tab === 'telemetry' ? 'Audit Stream' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'ledger' && (
          <div className="animate-fade-in">
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

            <div className="bg-black border border-green-800 rounded-lg overflow-hidden">
               <table className="w-full text-left text-xs">
                 <thead className="bg-green-900/10 text-green-300">
                   <tr>
                     <th className="p-3">Contract Hash</th>
                     <th className="p-3">Signer</th>
                     <th className="p-3">Gov ID</th>
                     <th className="p-3">Contact</th>
                     <th className="p-3">Deployed At</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-green-900/30">
                   {ledger.map((rec) => (
                     <tr key={rec.id} className="hover:bg-green-900/10 transition-colors">
                       <td className="p-3 font-mono text-green-600">{rec.contractHash.substring(0,10)}...</td>
                       <td className="p-3 font-bold text-white">{rec.signerName} ({rec.projectName})</td>
                       <td className="p-3 font-mono">{rec.signerGovId}</td>
                       <td className="p-3">{rec.signerPhone} <br/> <span className="text-[10px] text-gray-500">{rec.userEmail}</span></td>
                       <td className="p-3">{new Date(rec.deployedAt).toLocaleDateString()}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="bg-black border border-green-800 rounded-lg overflow-hidden animate-fade-in h-[500px] overflow-y-auto">
             <div className="p-3 bg-green-900/20 border-b border-green-800 sticky top-0 font-bold text-sm uppercase">Live Audit Stream</div>
             <table className="w-full text-left text-xs font-mono">
               <tbody className="divide-y divide-green-900/30">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-green-900/5">
                      <td className="p-2 w-32 text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="p-2 w-48 font-bold text-green-400">{log.action}</td>
                      <td className="p-2 text-gray-300">{log.userEmail}</td>
                      <td className="p-2 text-gray-400">{log.details}</td>
                      <td className="p-2 w-24 text-right">
                         <span className={`px-2 py-0.5 rounded ${log.riskLevel === 'CRITICAL' ? 'bg-red-900 text-red-200' : log.riskLevel === 'HIGH' ? 'bg-amber-900 text-amber-200' : 'text-gray-600'}`}>
                           {log.riskLevel}
                         </span>
                      </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
             {feedback.map((fb) => (
               <div key={fb.id} className="bg-green-900/10 border border-green-800 p-4 rounded hover:bg-green-900/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-bold">{fb.projectName}</span>
                    <div className="flex text-amber-400">
                       {'★'.repeat(fb.rating)}{'☆'.repeat(5-fb.rating)}
                    </div>
                  </div>
                  <p className="text-gray-400 italic text-sm mb-2">"{fb.comment}"</p>
                  <div className="text-[10px] text-green-700 uppercase">{fb.userEmail} • {new Date(fb.submittedAt).toLocaleDateString()}</div>
               </div>
             ))}
          </div>
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