import React, { ReactNode } from 'react';
import { Language, UserProfile } from '../types';

interface LayoutProps {
  children: ReactNode;
  user?: UserProfile | null;
  onLogout?: () => void;
  selectedLang?: Language;
  onLangChange?: (lang: Language) => void;
  onOpenAdmin?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, selectedLang, onLangChange, onOpenAdmin }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col font-sans selection:bg-bizflow-500 selection:text-white">
      <header className="border-b border-bizflow-900/50 bg-dark-card/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-bizflow-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <img 
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light" 
                alt="Founder Logo" 
                className="relative w-12 h-12 rounded-full border-2 border-bizflow-500/50 bg-dark-bg object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-bizflow-200 to-bizflow-400">
                BizFlow<span className="text-white">.AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-dark-muted font-bold flex items-center gap-1">
                AutoCEO Suite <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* New Security Badge */}
             <div className="hidden lg:flex items-center gap-2 bg-green-900/20 border border-green-800 px-3 py-1 rounded-full text-[10px] font-bold text-green-400 tracking-wider">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                 <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
               </svg>
               SYSTEM: SECURE
             </div>

            {/* Language Selector */}
            {onLangChange && selectedLang && (
              <select 
                value={selectedLang}
                onChange={(e) => onLangChange(e.target.value as Language)}
                className="bg-dark-bg border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1 focus:ring-bizflow-500 focus:border-bizflow-500 block hover:bg-gray-800 transition-colors"
              >
                {Object.values(Language).map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            )}

            {user ? (
               <div className="flex items-center gap-3">
                  {user.isAdmin && (
                    <button 
                      onClick={onOpenAdmin}
                      className="hidden sm:flex items-center gap-1 px-3 py-1 bg-green-900/50 border border-green-500/50 text-green-400 text-xs font-bold rounded hover:bg-green-900 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                      </svg>
                      ADMIN
                    </button>
                  )}
                  <div className="text-right hidden sm:block">
                     <div className="text-xs text-gray-400">Secure ID</div>
                     <div className="text-sm font-bold text-white">{user.name}</div>
                  </div>
                  <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-300 border border-red-900 bg-red-900/10 px-3 py-1 rounded transition-colors">
                    Logout
                  </button>
               </div>
            ) : (
               <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-bizflow-900/30 border border-bizflow-500/20 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-bizflow-200">Gemini 3 Pro</span>
               </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12 relative z-10">
        {children}
      </main>
      <footer className="border-t border-bizflow-900/30 py-8 mt-auto bg-dark-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="text-center md:text-left">
             <p className="text-dark-muted text-sm font-medium">
               &copy; {new Date().getFullYear()} BizFlow AutoCEO. Secure Enterprise Architecture.
             </p>
             <p className="text-xs text-gray-600 mt-2">
               "Ideas are cheap. Execution is everything."
             </p>
           </div>
           <div className="text-center md:text-right">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Developer Contact (Secure)</p>
              <a href="mailto:soumoditt@gmail.com" className="text-bizflow-400 hover:text-white transition-colors text-sm font-mono block">
                 soumoditt@gmail.com
              </a>
              <div className="flex justify-center md:justify-end gap-2 mt-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span className="text-[10px] text-gray-500">System Operational</span>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;