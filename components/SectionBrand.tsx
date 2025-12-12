import React from 'react';
import { Branding, Language } from '../types';
import { getLabel } from '../utils/i18n';

interface Props {
  data: Branding;
  language: Language;
}

const SectionBrand: React.FC<Props> = ({ data, language }) => {
  return (
    <div className="space-y-8">
      {/* Identity */}
      <div className="text-center space-y-2 py-8 bg-dark-card rounded-xl border border-bizflow-900/50">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{data.name}</h2>
        <p className="text-xl text-bizflow-400 italic font-medium">"{data.tagline}"</p>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 px-4">{data.positioning}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50">
          <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">Color Palette</h3>
          <div className="space-y-4">
            {data.colors.map((color, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-xl shadow-lg"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div>
                  <h4 className="text-white font-bold">{color.name}</h4>
                  <p className="text-gray-500 font-mono text-xs">{color.hex}</p>
                  <p className="text-gray-400 text-sm">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography & Logo */}
        <div className="space-y-6">
          <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50">
             <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">Typography</h3>
             <div className="space-y-4">
               <div>
                  <span className="text-xs text-gray-500 uppercase">Primary Font</span>
                  <p className="text-2xl font-bold text-white">{data.typography.primary}</p>
               </div>
               <div>
                  <span className="text-xs text-gray-500 uppercase">Secondary Font</span>
                  <p className="text-xl text-gray-300">{data.typography.secondary}</p>
               </div>
             </div>
          </div>
          
          <div className="bg-dark-card p-6 rounded-xl border border-bizflow-900/50">
             <h3 className="text-white font-bold mb-4 border-b border-gray-800 pb-2">Logo Concept</h3>
             <p className="text-gray-300 leading-relaxed">{data.logoConcept}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBrand;