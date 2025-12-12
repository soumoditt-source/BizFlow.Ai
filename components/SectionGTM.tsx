import React from 'react';
import { GTMStrategy, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: GTMStrategy;
  language: Language;
}

const SectionGTM: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Launch Plan */}
        <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
           <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'launchMap')}</h3>
           <ol className="relative border-l border-gray-700 ml-3">
             {data.launchPlan.map((step, idx) => (
               <li key={idx} className="mb-6 ml-6 last:mb-0">
                 <span className="absolute flex items-center justify-center w-6 h-6 bg-bizflow-900 rounded-full -left-3 ring-4 ring-dark-card">
                    <span className="w-2 h-2 bg-bizflow-500 rounded-full"></span>
                 </span>
                 <p className="text-gray-300">{step}</p>
               </li>
             ))}
           </ol>
        </div>

        <div className="space-y-6">
           {/* Channels */}
           <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'channels')}</h3>
              <div className="space-y-4">
                {data.channels.map((ch, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-bizflow-400 font-bold">{ch.name}</span>
                    </div>
                    <p className="text-sm text-gray-400">{ch.strategy}</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Assets */}
           <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'assets')}</h3>
              <div className="flex flex-wrap gap-2">
                {data.marketingAssets.map((asset, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
                    {asset}
                  </span>
                ))}
              </div>
           </div>
        </div>
      </div>
      
      {/* Growth Loops */}
      <div className="bg-gradient-to-r from-bizflow-900 to-dark-card border border-bizflow-700 p-6 rounded-xl">
         <h3 className="text-white font-bold mb-2">{getLabel(language, 'growthLoop')}</h3>
         <p className="text-lg text-gray-200">{data.growthLoops}</p>
      </div>
    </div>
  );
};

export default SectionGTM;