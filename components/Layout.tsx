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
    <div className="min-h-screen bg-[#09090b] text-dark-text flex flex-col font-sans selection:bg-bizflow-500 selection:text-white relative overflow-x-hidden">
      {/* Figma-like Dot Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-bizflow-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                 {/* Restored Graphical Icon */}
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-bizflow-400">
                    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-3.3 2.568-7.906 3.023-11.606.136a.75.75 0 01-.26-.87l1.914-4.66a8.557 8.557 0 01-1.012-3.805 9.176 9.176 0 01.26-.87zM8.502 11.23a9.96 9.96 0 01-2.427 1.884l1.37-3.336a9.96 9.96 0 011.057 1.452zm7.14-5.32c.792 1.393 1.258 2.977 1.258 4.66 0 1.25-.258 2.44-.727 3.525l3.228-7.858a10.02 10.02 0 00-3.76-1.855l.001.002zM12 22.5a.75.75 0 01-.58-.314l-2.006-2.883a.75.75 0 011.232-.857l1.354 1.944 1.354-1.944a.75.75 0 011.232.857l-2.006 2.883a.75.75 0 01-.58.314z" clipRule="evenodd" />
                 </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white">
                BizFlow<span className="text-gray-500">.AI</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Security Badge */}
             <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 tracking-wider">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
               SYSTEM: SECURE
             </div>

            {/* Language Selector */}
            {onLangChange && selectedLang && (
              <select 
                value={selectedLang}
                onChange={(e) => onLangChange(e.target.value as Language)}
                className="bg-black border border-white/10 text-gray-400 text-xs rounded px-2 py-1 focus:ring-1 focus:ring-bizflow-500 focus:border-bizflow-500 block hover:bg-white/5 transition-colors outline-none"
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
                      className="hidden sm:flex items-center gap-1 px-3 py-1 bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-bold rounded hover:bg-green-900/50 transition-colors"
                    >
                      ADMIN
                    </button>
                  )}
                  <div className="text-right hidden sm:block">
                     <div className="text-[10px] text-gray-500 uppercase tracking-wider">Operator</div>
                     <div className="text-xs font-bold text-white">{user.name}</div>
                  </div>
                  <button onClick={onLogout} className="text-xs text-red-400 hover:text-white border border-transparent hover:border-red-900/50 hover:bg-red-900/20 px-3 py-1 rounded transition-colors">
                    Logout
                  </button>
               </div>
            ) : (
               <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5">
                  <span className="text-[10px] font-mono text-gray-400">Enterprise AI</span>
               </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-8 md:py-12 relative z-10">
        {children}
      </main>
      <footer className="border-t border-white/5 py-8 mt-auto bg-black/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-center md:text-left">
             <p className="text-gray-500 text-xs font-mono">
               BizFlow AutoCEO &copy; {new Date().getFullYear()} // Secure Enterprise Architecture
             </p>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-600 font-mono">STATUS: OPERATIONAL</span>
              <div className="flex gap-1">
                 <div className="w-1 h-3 bg-green-500/20 rounded-full"></div>
                 <div className="w-1 h-3 bg-green-500/40 rounded-full"></div>
                 <div className="w-1 h-3 bg-green-500/60 rounded-full"></div>
                 <div className="w-1 h-3 bg-green-500/80 rounded-full"></div>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;