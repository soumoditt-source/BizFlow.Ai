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
        <div className="bg-[#1a1a1a] border border-dashed border-gray-700 p-6 rounded-lg relative group hover:border-bizflow-500/50 transition-colors">
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500/50"></div>
          <h3 className="text-gray-500 font-mono text-[10px] uppercase mb-2">{getLabel(language, 'problem')}</h3>
          <p className="text-gray-200 text-sm font-light leading-relaxed">{data.problem}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-dashed border-gray-700 p-6 rounded-lg relative group hover:border-bizflow-500/50 transition-colors">
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500/50"></div>
          <h3 className="text-gray-500 font-mono text-[10px] uppercase mb-2">{getLabel(language, 'solution')}</h3>
          <p className="text-gray-200 text-sm font-light leading-relaxed">{data.solution}</p>
        </div>
        <div className="bg-gradient-to-br from-bizflow-900/20 to-[#1a1a1a] border border-bizflow-500/30 p-6 rounded-lg shadow-lg">
          <h3 className="text-bizflow-400 font-mono text-[10px] uppercase mb-2">{getLabel(language, 'usp')}</h3>
          <p className="text-white text-lg font-medium italic">"{data.usp}"</p>
        </div>
      </div>

      {/* Market Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['tam', 'sam', 'som'].map((metric) => (
          <div key={metric} className="bg-[#1a1a1a] p-4 rounded-lg border-l-2 border-gray-700 flex flex-col justify-between h-24">
             <span className="text-[10px] text-gray-500 uppercase font-mono">{getLabel(language, metric as any)}</span>
             <span className="text-2xl font-bold text-white">
               {/* @ts-ignore */}
               {data.marketResearch[metric]}
             </span>
          </div>
        ))}
      </div>
      
      {/* Insight & Citations */}
      <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-lg relative">
         <div className="flex items-start gap-4">
           <div className="p-2 bg-bizflow-900/30 rounded border border-bizflow-500/20 text-bizflow-400">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
               <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.683a1 1 0 01.633.633l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
             </svg>
           </div>
           <div>
              <h3 className="text-white font-bold text-sm mb-1">{getLabel(language, 'marketStats')}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">"{data.marketResearch.insight}"</p>
              
              {data.marketResearch.citations && data.marketResearch.citations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.marketResearch.citations.map((cite, i) => (
                    <span key={i} className="px-2 py-1 bg-black rounded border border-gray-800 text-[10px] text-gray-500 font-mono hover:text-gray-300 hover:border-gray-600 transition-colors cursor-help" title="Verified Source">
                       [REF-{i+1}] {cite}
                    </span>
                  ))}
                </div>
              )}
           </div>
         </div>
      </div>

      {/* Personas & Competitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personas */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden">
          <div className="bg-black/40 px-6 py-3 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-sm text-gray-300">{getLabel(language, 'personas')}</h3>
          </div>
          <div className="p-6 space-y-6">
            {data.userPersonas.map((persona, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold text-white border border-gray-700">
                  {persona.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{persona.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{persona.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {persona.painPoints.map((pt, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-[10px] rounded border border-red-500/20">
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
        <div className="bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden">
          <div className="bg-black/40 px-6 py-3 border-b border-white/5">
            <h3 className="font-bold text-sm text-gray-300">{getLabel(language, 'competition')}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.competitiveLandscape.map((comp, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 text-xs border-b border-gray-800 pb-3 last:border-0 last:pb-0 items-center">
                  <div className="col-span-3 font-semibold text-white">{comp.competitor}</div>
                  <div className="col-span-9 flex flex-col gap-1">
                     <span className="text-gray-500">{getLabel(language, 'weakness')}: <span className="text-gray-400">{comp.weakness}</span></span>
                     <span className="text-bizflow-500 font-medium">{getLabel(language, 'advantage')}: {comp.bizflowAdvantage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBlueprint;