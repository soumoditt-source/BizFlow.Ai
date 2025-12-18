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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-[#09090b] border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[92vh] animate-fade-in-up">
        
        {/* Header - Optimized for Mobile */}
        <div className="bg-white/5 p-5 md:p-6 border-b border-white/10 flex justify-between items-center shrink-0">
          <div>
             <h2 className="text-base md:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-bizflow-500">
                 <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
               </svg>
               {step === 'kyc' ? 'Verification' : 'Binding Agreement'}
             </h2>
             <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">Protocol-SEC-V3</p>
          </div>
          <div className="flex gap-1.5">
             <div className={`w-1.5 h-1.5 rounded-full ${step === 'kyc' ? 'bg-bizflow-500 shadow-[0_0_8px_#14b8a6]' : 'bg-white/10'}`}></div>
             <div className={`w-1.5 h-1.5 rounded-full ${step === 'terms' ? 'bg-bizflow-500 shadow-[0_0_8px_#14b8a6]' : 'bg-white/10'}`}></div>
          </div>
        </div>

        {/* KYC STEP */}
        {step === 'kyc' && (
          <form onSubmit={handleKycSubmit} className="p-5 md:p-8 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar">
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
               <p className="text-amber-500 text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest mb-1">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 Identification Required
               </p>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Deployment requires verified identity to establish a legally binding 13% Stakeholder contract.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Legal Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:border-bizflow-500 outline-none font-medium text-sm transition-all"
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tax ID / Gov ID</label>
                  <input 
                    type="text" 
                    required
                    value={formData.govId}
                    onChange={e => setFormData({...formData, govId: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:border-bizflow-500 outline-none font-medium text-sm transition-all"
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Contact</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:border-bizflow-500 outline-none font-medium text-sm transition-all"
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mailing Address</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white p-3 rounded-xl focus:border-bizflow-500 outline-none font-medium text-sm transition-all"
                  />
               </div>
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-all text-xs tracking-widest shadow-xl shadow-white/5 mt-4">
              Proceed to Terms
            </button>
          </form>
        )}

        {/* TERMS STEP */}
        {step === 'terms' && (
          <div className="flex flex-col h-full overflow-hidden">
             <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-scrollbar">
                <div className="bg-black/50 border border-white/5 p-5 text-[11px] text-gray-400 font-mono leading-relaxed rounded-xl shadow-inner">
                    <strong className="text-white block mb-3 text-sm underline decoration-bizflow-500">MASTER SERVICE AGREEMENT</strong>
                    <p className="mb-3">I, <span className="text-bizflow-400 font-bold">{formData.name}</span>, hereby grant Soumoditya Das (The Architect) a perpetual 13% gross royalty and 13% non-dilutable equity in the business architecture being deployed.</p>
                    <p>Failure to comply with quarterly financial reporting constitutes a violation of the digital equity grant under international jurisdiction.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: 'royalty', label: '13% Perpetual Royalty Stake' },
                      { key: 'equity', label: '13% Non-dilutable Equity' },
                      { key: 'audit', label: 'Financial Audit Rights' },
                      { key: 'jurisdiction', label: 'International Trade Laws' }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors">
                        <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${agreements[item.key as keyof typeof agreements] ? 'bg-bizflow-600 border-bizflow-600' : 'border-white/10'}`}>
                            {agreements[item.key as keyof typeof agreements] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreements[item.key as keyof typeof agreements]} onChange={e => setAgreements({...agreements, [item.key]: e.target.checked})} />
                        <span className="text-xs text-gray-300 font-medium">{item.label}</span>
                      </label>
                    ))}
                </div>
             </div>

             <div className="p-5 md:p-8 pt-0 border-t border-white/5 bg-black/40 shrink-0 flex gap-4">
               <button onClick={() => setStep('kyc')} className="px-5 py-4 border border-white/10 text-gray-400 font-bold uppercase rounded-xl hover:text-white transition-all text-[10px] tracking-widest">Back</button>
               <button 
                 onClick={handleFinalSign}
                 className="flex-1 bg-gradient-to-r from-bizflow-600 to-emerald-600 hover:from-bizflow-500 hover:to-emerald-500 text-white font-bold uppercase rounded-xl shadow-xl shadow-bizflow-600/20 transition-all flex items-center justify-center gap-2 text-[10px] tracking-widest"
               >
                 Execute Deployment
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalModal;