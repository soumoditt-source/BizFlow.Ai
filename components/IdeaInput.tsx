import React, { useState } from 'react';
import { Language } from '../types';
import { getLabel } from '../utils/i18n';
import { improveIdea } from '../services/geminiService';

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isGenerating: boolean;
  language: Language;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onSubmit, isGenerating, language }) => {
  const [idea, setIdea] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  const handleEnhance = async () => {
    if (!idea.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const improved = await improveIdea(idea, language);
      setIdea(improved.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Turn your idea into a <span className="text-bizflow-400">Fortune 500</span> blueprint.
        </h1>
        <p className="text-lg text-dark-muted">
           BizFlow AutoCEO: Multi-Agent AI System. Gemini 3 Pro Powered.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-bizflow-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-dark-card rounded-xl p-2 shadow-2xl border border-bizflow-900/50">
          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={getLabel(language, 'inputPlaceholder')}
              className="w-full bg-dark-bg/50 text-white placeholder-gray-500 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-bizflow-500/50 resize-none h-32 text-lg pr-12"
              disabled={isGenerating || isEnhancing}
            />
            
            {/* AI Enhance Button Overlay */}
            <div className="absolute bottom-4 right-4 z-10">
               <button
                 type="button"
                 onClick={handleEnhance}
                 disabled={!idea.trim() || isEnhancing || isGenerating}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    !idea.trim() 
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                    : 'border-purple-500/50 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40 hover:text-white'
                 }`}
               >
                 {isEnhancing ? (
                   <>
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enhancing...
                   </>
                 ) : (
                   <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                    AI Enhance
                   </>
                 )}
               </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-2 mt-2">
            <span className="text-xs text-dark-muted uppercase tracking-wider font-semibold">
              P.T.C.F System Active ({language})
            </span>
            <button
              type="submit"
              disabled={!idea.trim() || isGenerating || isEnhancing}
              className={`
                px-6 py-2 rounded-lg font-bold transition-all duration-200
                flex items-center gap-2
                ${!idea.trim() || isGenerating || isEnhancing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-bizflow-500 hover:bg-bizflow-400 text-white shadow-lg shadow-bizflow-500/30 transform hover:-translate-y-0.5'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {getLabel(language, 'architecting')}
                </>
              ) : (
                <>
                  {getLabel(language, 'generateBtn')}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-3.3 2.568-7.906 3.023-11.606.136a.75.75 0 01-.26-.87l1.914-4.66a8.557 8.557 0 01-1.012-3.805 9.176 9.176 0 01.26-.87zM8.502 11.23a9.96 9.96 0 01-2.427 1.884l1.37-3.336a9.96 9.96 0 011.057 1.452zm7.14-5.32c.792 1.393 1.258 2.977 1.258 4.66 0 1.25-.258 2.44-.727 3.525l3.228-7.858a10.02 10.02 0 00-3.76-1.855l.001.002zM12 22.5a.75.75 0 01-.58-.314l-2.006-2.883a.75.75 0 011.232-.857l1.354 1.944 1.354-1.944a.75.75 0 011.232.857l-2.006 2.883a.75.75 0 01-.58.314z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-dark-muted">
          <div className="flex flex-col items-center">
            <span className="block text-bizflow-400 font-bold text-lg mb-1">10s</span>
            <span>Speed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block text-bizflow-400 font-bold text-lg mb-1">13+</span>
            <span>Languages</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block text-bizflow-400 font-bold text-lg mb-1">100%</span>
            <span>AI Generated</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IdeaInput;