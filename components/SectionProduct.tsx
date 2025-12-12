import React from 'react';
import { ProductArchitecture, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: ProductArchitecture;
  language: Language;
}

const SectionProduct: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-6">
      {/* Tech Stack */}
      <h3 className="text-white font-bold border-b border-gray-800 pb-2">{getLabel(language, 'techStack')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(data.techStack).map(([key, val]) => (
          <div key={key} className="bg-dark-card border border-bizflow-900/50 p-4 rounded-xl text-center">
            <div className="text-xs text-gray-500 uppercase mb-2 font-bold">{key}</div>
            <div className="text-white font-mono text-sm break-words">{val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Components */}
        <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
           <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'coreComp')}</h3>
           <ul className="space-y-3">
             {data.coreComponents.map((comp, idx) => (
               <li key={idx} className="flex items-start text-sm text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-bizflow-500 mr-2 flex-shrink-0">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {comp}
               </li>
             ))}
           </ul>
        </div>

        {/* User Flows */}
        <div className="lg:col-span-2 bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
           <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'userJourney')}</h3>
           <div className="space-y-6 relative">
             <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-800"></div>
             {data.userFlows.map((flow, idx) => (
               <div key={idx} className="relative flex items-start pl-12">
                 <div className="absolute left-0 top-1 w-8 h-8 bg-bizflow-900 rounded-full border border-bizflow-500 flex items-center justify-center text-xs font-bold text-white z-10">
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-sm">{flow.step}</h4>
                   <p className="text-gray-400 text-sm mt-1">{flow.description}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* DB Schema */}
      <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
        <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">{getLabel(language, 'dbSchema')}</h3>
        <pre className="bg-[#0f172a] p-4 rounded-lg overflow-x-auto text-sm text-bizflow-300 font-mono border border-gray-800">
          {data.databaseSchema}
        </pre>
      </div>
    </div>
  );
};

export default SectionProduct;