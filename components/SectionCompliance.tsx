import React from 'react';
import { CompliancePolicy, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: CompliancePolicy;
  language: Language;
}

const SectionCompliance: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-red-900/20 to-transparent p-6 rounded-xl border border-red-500/30">
        <div>
           <h2 className="text-2xl font-bold text-white mb-1">{getLabel(language, 'region')}: <span className="text-red-400">{data.region}</span></h2>
           <p className="text-gray-400 text-sm">{getLabel(language, 'complianceTitle')}</p>
        </div>
        <div className="text-right">
           <div className="text-4xl font-bold text-white">{data.riskScore}/100</div>
           <div className="text-xs text-red-400 uppercase tracking-widest">{getLabel(language, 'riskScore')}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {data.regulations.map((reg, idx) => (
           <div key={idx} className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl hover:border-bizflow-500/50 transition-colors">
             <div className="flex items-center gap-2 mb-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
               <h3 className="font-bold text-white">{reg.name}</h3>
             </div>
             <p className="text-sm text-gray-400 mb-4">{reg.description}</p>
             <div className="bg-red-900/10 border border-red-900/30 p-3 rounded-lg">
                <span className="text-xs text-red-300 font-bold uppercase block mb-1">{getLabel(language, 'actionReq')}:</span>
                <p className="text-xs text-gray-300">{reg.actionRequired}</p>
             </div>
           </div>
         ))}
      </div>

      <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl flex items-center justify-between">
         <span className="text-gray-400 font-medium">{getLabel(language, 'dataPrivacy')}</span>
         <span className="px-4 py-1 bg-bizflow-900/50 border border-bizflow-500/30 text-bizflow-300 rounded-full text-sm font-bold">
            {data.dataPrivacyLevel}
         </span>
      </div>
    </div>
  );
};

export default SectionCompliance;