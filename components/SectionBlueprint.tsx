import React from 'react';
import { BusinessBlueprint, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: BusinessBlueprint;
  language: Language;
}

const SectionBlueprint: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-6">
      {/* High Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
          <h3 className="text-bizflow-400 font-semibold uppercase tracking-wider text-xs mb-3">{getLabel(language, 'problem')}</h3>
          <p className="text-gray-300 leading-relaxed">{data.problem}</p>
        </div>
        <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
          <h3 className="text-bizflow-400 font-semibold uppercase tracking-wider text-xs mb-3">{getLabel(language, 'solution')}</h3>
          <p className="text-gray-300 leading-relaxed">{data.solution}</p>
        </div>
        <div className="bg-gradient-to-br from-bizflow-900 to-dark-card border border-bizflow-700 p-6 rounded-xl shadow-lg shadow-bizflow-900/20">
          <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">{getLabel(language, 'usp')}</h3>
          <p className="text-white font-medium italic">"{data.usp}"</p>
        </div>
      </div>

      {/* Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-card p-6 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-white mb-1">{data.marketResearch.tam}</span>
            <span className="text-xs text-gray-400 uppercase">{getLabel(language, 'tam')}</span>
        </div>
        <div className="bg-dark-card p-6 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-white mb-1">{data.marketResearch.sam}</span>
            <span className="text-xs text-gray-400 uppercase">{getLabel(language, 'sam')}</span>
        </div>
        <div className="bg-dark-card p-6 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-white mb-1">{data.marketResearch.som}</span>
            <span className="text-xs text-gray-400 uppercase">{getLabel(language, 'som')}</span>
        </div>
      </div>
      
      {/* Insight & Citations */}
      <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
         <h3 className="text-bizflow-400 font-semibold uppercase tracking-wider text-xs mb-3">{getLabel(language, 'marketStats')}</h3>
         <p className="text-gray-300 mb-4 italic">"{data.marketResearch.insight}"</p>
         
         {data.marketResearch.citations && data.marketResearch.citations.length > 0 && (
           <div className="bg-black/30 p-3 rounded border border-gray-800">
             <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2">{getLabel(language, 'citations')}</h4>
             <ul className="text-xs text-gray-400 space-y-1">
               {data.marketResearch.citations.map((cite, i) => (
                 <li key={i} className="flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-bizflow-500"></span>
                   {cite}
                 </li>
               ))}
             </ul>
           </div>
         )}
      </div>

      {/* Personas & Competitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personas */}
        <div className="bg-dark-card border border-bizflow-900/50 rounded-xl overflow-hidden">
          <div className="bg-dark-bg/50 px-6 py-4 border-b border-bizflow-900/50">
            <h3 className="font-bold text-lg">{getLabel(language, 'personas')}</h3>
          </div>
          <div className="p-6 space-y-6">
            {data.userPersonas.map((persona, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-300">
                  {persona.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{persona.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{persona.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {persona.painPoints.map((pt, i) => (
                      <span key={i} className="px-2 py-1 bg-red-900/30 text-red-200 text-xs rounded border border-red-900/50">
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitors */}
        <div className="bg-dark-card border border-bizflow-900/50 rounded-xl overflow-hidden">
          <div className="bg-dark-bg/50 px-6 py-4 border-b border-bizflow-900/50">
            <h3 className="font-bold text-lg">{getLabel(language, 'competition')}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.competitiveLandscape.map((comp, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 text-sm border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <div className="col-span-3 font-semibold text-white">{comp.competitor}</div>
                  <div className="col-span-4 text-gray-400">{getLabel(language, 'weakness')}: {comp.weakness}</div>
                  <div className="col-span-5 text-bizflow-400">{getLabel(language, 'advantage')}: {comp.bizflowAdvantage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
       <div className="bg-dark-card border border-bizflow-900/50 p-6 rounded-xl">
          <h3 className="text-bizflow-400 font-semibold uppercase tracking-wider text-xs mb-3">{getLabel(language, 'pricing')}</h3>
          <p className="text-gray-300">{data.pricingStrategy}</p>
        </div>
    </div>
  );
};

export default SectionBlueprint;