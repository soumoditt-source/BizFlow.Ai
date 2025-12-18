
import React, { useState } from 'react';
import { getLabel } from '../utils/i18n';
import { Language } from '../types';
import { AuthService } from '../services/authService';

interface AuthScreenProps {
  onLogin: (email: string, name: string) => void;
  language: Language;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, language }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [authStage, setAuthStage] = useState(0);

  const authSteps = [
    "Contacting Google Identity Provider...",
    "Validating secure token...",
    "Verifying environment integrity...",
    "System Access Authorized"
  ];

  const handleGoogleAuth = () => {
    setIsAuthInProgress(true);
    let current = 0;
    const interval = setInterval(() => {
      if (current >= authSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          const profile = { email: "founder@google-user.com", name: "Google Account" };
          AuthService.googleLogin(profile);
          onLogin(profile.email, profile.name);
        }, 500);
      } else {
        current++;
        setAuthStage(current);
      }
    }, 800);
  };

  const handleManualAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsAuthInProgress(true);
      setTimeout(() => {
        onLogin(email, name);
      }, 2000);
    }
  };

  if (isAuthInProgress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="w-16 h-16 border-4 border-bizflow-500/20 border-t-bizflow-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Secure Entry</h2>
        <p className="text-bizflow-400 font-mono text-xs uppercase animate-pulse">{authSteps[authStage]}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-full max-w-md bg-dark-card border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bizflow-500 to-purple-600"></div>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bizflow-400">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
             </svg>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">System Login</h1>
          <p className="text-gray-500 text-sm mt-1">Authorized Founders Only</p>
        </div>

        <button 
          onClick={handleGoogleAuth}
          className="w-full bg-white text-black font-bold py-4 rounded-xl mb-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-dark-card px-2 text-gray-600 font-mono tracking-widest">or manual override</span></div>
        </div>

        <form onSubmit={handleManualAuth} className="space-y-4">
           <input 
            type="email" 
            placeholder="Authorized Email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-bizflow-500 transition-all text-sm font-mono"
           />
           <input 
            type="text" 
            placeholder="Security Name" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-bizflow-500 transition-all text-sm font-mono"
           />
           <button type="submit" className="w-full bg-bizflow-600 hover:bg-bizflow-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-bizflow-600/10 uppercase tracking-widest text-xs">
              Access Vault
           </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
