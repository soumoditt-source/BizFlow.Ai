import React, { useState } from 'react';
import { UserProfile } from '../types';
import { getLabel } from '../utils/i18n';
import { AuthService } from '../services/authService';
import { Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (kycData: { name: string; govId: string; phone: string; address: string }) => void;
  user?: UserProfile | null;
}

const LegalModal: React.FC<Props> = ({ isOpen, onClose, onAccept, user }) => {
  const [step, setStep] = useState<'kyc' | 'terms'>('kyc');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    govId: user?.govId || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  
  const [agreements, setAgreements] = useState({
    royalty: false,
    equity: false,
    audit: false,
    jurisdiction: false
  });
  
  const language = Language.ENGLISH; 

  if (!isOpen) return null;

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.govId && formData.phone && formData.address) {
      setStep('terms');
    } else {
      alert("All KYC fields are mandatory.");
    }
  };

  const handleFinalSign = () => {
    const allChecked = Object.values(agreements).every(v => v);
    if (!allChecked) {
      alert("You must agree to all terms.");
      return;
    }
    onAccept(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-[#09090b] border border-white/10 rounded-xl max-w-2xl w-full shadow-2xl shadow-black/50 transform transition-all animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-white/5 p-4 md:p-6 border-b border-white/10 flex justify-between items-center shrink-0">
          <div>
             <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-bizflow-500">
                 <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
               </svg>
               {step === 'kyc' ? getLabel(language, 'legalTitle') : getLabel(language, 'bindingAgreement')}
             </h2>
             <p className="text-[10px] text-gray-500 font-mono mt-1">{getLabel(language, 'secureProtocol')} // ID: {crypto.randomUUID().split('-')[0].toUpperCase()}</p>
          </div>
          <div className="flex gap-1">
             <div className={`w-2 h-2 rounded-full ${step === 'kyc' ? 'bg-bizflow-500' : 'bg-gray-800'}`}></div>
             <div className={`w-2 h-2 rounded-full ${step === 'terms' ? 'bg-bizflow-500' : 'bg-gray-800'}`}></div>
          </div>
        </div>

        {/* KYC STEP */}
        {step === 'kyc' && (
          <form onSubmit={handleKycSubmit} className="p-4 md:p-8 space-y-4 md:space-y-6 overflow-y-auto">
            <div className="bg-amber-950/30 border border-amber-900/50 p-4 rounded mb-2">
               <p className="text-amber-500 text-xs font-bold uppercase flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                 {getLabel(language, 'mandatoryReq')}
               </p>
               <p className="text-amber-200/50 text-xs mt-1">
                 {getLabel(language, 'legalDisclaimer')}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
               <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{getLabel(language, 'fullName')}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded focus:border-bizflow-500 outline-none font-mono text-sm"
                    placeholder="John Doe"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{getLabel(language, 'govId')}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.govId}
                    onChange={e => setFormData({...formData, govId: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded focus:border-bizflow-500 outline-none font-mono text-sm"
                    placeholder="XXX-XX-XXXX"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{getLabel(language, 'phone')}</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded focus:border-bizflow-500 outline-none font-mono text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{getLabel(language, 'address')}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded focus:border-bizflow-500 outline-none font-mono text-sm"
                    placeholder="123 Startup Blvd, NY"
                  />
               </div>
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold uppercase py-3 rounded hover:bg-gray-200 transition-colors text-sm tracking-wide mt-4">
              {getLabel(language, 'verifyProceed')}
            </button>
          </form>
        )}

        {/* TERMS STEP */}
        {step === 'terms' && (
          <div className="flex flex-col h-full overflow-hidden">
             <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="bg-black border border-white/10 p-4 mb-6 text-xs text-gray-400 font-mono leading-relaxed rounded">
                    <strong className="text-white block mb-2 underline">{getLabel(language, 'masterAgreement')}</strong>
                    <p className="mb-2">I, <span className="text-bizflow-400">{formData.name}</span> (ID: {formData.govId}), residing at {formData.address}, hereby acknowledge the following terms upon deployment of this Intellectual Property:</p>
                    <p className="mb-2">1. <strong>ROYALTY:</strong> I grant Soumoditya Das (The Architect) a perpetual, irrevocable 13% gross royalty on all revenue generated by this software.</p>
                    <p className="mb-2">2. <strong>EQUITY:</strong> I allocate 13% non-dilutable equity in the registered legal entity formed around this technology.</p>
                    <p className="mb-2">3. <strong>AUDIT:</strong> I grant admin access for financial auditing purposes.</p>
                    <p className="mb-2">4. <strong>JURISDICTION:</strong> This agreement is governed by International Trade Laws and is binding in my local jurisdiction.</p>
                </div>

                <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 border border-gray-600 flex items-center justify-center rounded-sm shrink-0 ${agreements.royalty ? 'bg-bizflow-600 border-bizflow-600' : 'bg-transparent'}`}>
                        {agreements.royalty && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreements.royalty} onChange={e => setAgreements({...agreements, royalty: e.target.checked})} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{getLabel(language, 'agreeRoyalty')}</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 border border-gray-600 flex items-center justify-center rounded-sm shrink-0 ${agreements.equity ? 'bg-bizflow-600 border-bizflow-600' : 'bg-transparent'}`}>
                        {agreements.equity && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreements.equity} onChange={e => setAgreements({...agreements, equity: e.target.checked})} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{getLabel(language, 'agreeEquity')}</span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 border border-gray-600 flex items-center justify-center rounded-sm shrink-0 ${agreements.audit ? 'bg-bizflow-600 border-bizflow-600' : 'bg-transparent'}`}>
                        {agreements.audit && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreements.audit} onChange={e => setAgreements({...agreements, audit: e.target.checked})} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{getLabel(language, 'agreeAudit')}</span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className={`w-5 h-5 border border-gray-600 flex items-center justify-center rounded-sm shrink-0 ${agreements.jurisdiction ? 'bg-bizflow-600 border-bizflow-600' : 'bg-transparent'}`}>
                        {agreements.jurisdiction && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreements.jurisdiction} onChange={e => setAgreements({...agreements, jurisdiction: e.target.checked})} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{getLabel(language, 'agreeJurisdiction')}</span>
                    </label>
                </div>
             </div>

             <div className="p-4 md:p-8 pt-0 border-t border-white/5 bg-black/20 shrink-0 flex gap-4">
               <button onClick={() => setStep('kyc')} className="px-4 md:px-6 py-3 border border-gray-700 text-gray-400 font-bold uppercase rounded hover:text-white hover:border-gray-500 transition-colors text-xs">{getLabel(language, 'back')}</button>
               <button 
                 onClick={handleFinalSign}
                 className="flex-1 bg-gradient-to-r from-bizflow-600 to-green-600 hover:from-bizflow-500 hover:to-green-500 text-white font-bold uppercase rounded shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2 text-xs"
               >
                 {getLabel(language, 'signDeploy')}
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                 </svg>
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalModal;