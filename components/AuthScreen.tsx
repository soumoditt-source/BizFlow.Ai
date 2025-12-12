import React, { useState, useEffect } from 'react';
import { getLabel } from '../utils/i18n';
import { Language } from '../types';

interface AuthScreenProps {
  onLogin: (email: string, passOrName: string) => void;
  language: Language;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, language }) => {
  const [email, setEmail] = useState('');
  const [passOrName, setPassOrName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Security States
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && passOrName) {
      startSecurityScan();
    }
  };

  const startSecurityScan = () => {
    setIsScanning(true);
    // Simulation Sequence using Keys
    const steps = [
        getLabel(language, 'verifyingKeys'),
        getLabel(language, 'bioMatch'),
        getLabel(language, 'netScan'),
        getLabel(language, 'accessGranted')
    ];
    
    let current = 0;
    const interval = setInterval(() => {
        if (current >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
                onLogin(email, passOrName);
            }, 500);
        } else {
            current++;
            setScanStep(current);
        }
    }, 800);
  };

  if (isScanning) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in relative px-4">
              <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-8">
                      <div className="absolute inset-0 border-2 border-green-900 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-t-green-500 border-b-green-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-4 bg-green-500/10 rounded-full animate-pulse flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-500">
                           <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                      </div>
                  </div>
                  <h2 className="text-2xl font-black text-green-500 uppercase tracking-widest mb-2 text-center">{getLabel(language, 'legalTitle')}</h2>
                  <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-green-500 transition-all duration-300" 
                        style={{ width: `${((scanStep + 1) / 4) * 100}%` }}
                      ></div>
                  </div>
                  <p className="text-green-400 font-mono text-xs text-center">{
                      [getLabel(language, 'verifyingKeys'), getLabel(language, 'bioMatch'), getLabel(language, 'netScan'), getLabel(language, 'accessGranted')][scanStep]
                  }</p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in relative px-4">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(19,78,74,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(19,78,74,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

      <div className={`w-full max-w-md border ${isAdminMode ? 'border-green-500/50 bg-black' : 'border-bizflow-500/30 bg-dark-card'} p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500`}>
        
        {/* Top Scanner Line */}
        <div className={`absolute top-0 left-0 w-full h-1 ${isAdminMode ? 'bg-green-500' : 'bg-gradient-to-r from-bizflow-500 to-purple-600'} shadow-[0_0_20px_currentColor]`}></div>
        
        <div className="text-center mb-8 relative">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 ${isAdminMode ? 'border-green-500 bg-green-900/20' : 'border-bizflow-500 bg-bizflow-900/20'} transition-all duration-500`}>
            {isAdminMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500 animate-pulse">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bizflow-400">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h2 className={`text-2xl font-black uppercase tracking-widest ${isAdminMode ? 'text-green-500' : 'text-white'}`}>
            {isAdminMode ? getLabel(language, 'sysOverride') : getLabel(language, 'loginTitle')}
          </h2>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            {isAdminMode ? getLabel(language, 'rootAccess') : getLabel(language, 'secureGateway')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-[10px] font-bold uppercase mb-1 tracking-wider ${isAdminMode ? 'text-green-700' : 'text-gray-500'}`}>
              {isAdminMode ? getLabel(language, 'identityHash') : getLabel(language, 'authEmail')}
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-dark-bg border ${isAdminMode ? 'border-green-800 text-green-400 focus:border-green-500' : 'border-gray-700 text-white focus:border-bizflow-500'} rounded-lg p-3 pl-10 outline-none transition-all font-mono text-sm`}
                placeholder={isAdminMode ? "root@system.core" : "user@company.com"}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 absolute left-3 top-3.5 ${isAdminMode ? 'text-green-700' : 'text-gray-600'}`}>
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase mb-1 tracking-wider ${isAdminMode ? 'text-green-700' : 'text-gray-500'}`}>
              {isAdminMode ? getLabel(language, 'accessKey') : (isLogin ? `${getLabel(language, 'fullName')} / ID` : getLabel(language, 'fullName'))}
            </label>
            <div className="relative">
              <input 
                type={isAdminMode ? "password" : "text"}
                required
                value={passOrName}
                onChange={(e) => setPassOrName(e.target.value)}
                className={`w-full bg-dark-bg border ${isAdminMode ? 'border-green-800 text-green-400 focus:border-green-500' : 'border-gray-700 text-white focus:border-bizflow-500'} rounded-lg p-3 pl-10 outline-none transition-all font-mono text-sm`}
                placeholder={isAdminMode ? "••••••••••••" : "John Doe"}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 absolute left-3 top-3.5 ${isAdminMode ? 'text-green-700' : 'text-gray-600'}`}>
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <button 
            type="submit"
            className={`w-full font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 relative overflow-hidden group ${
              isAdminMode 
              ? 'bg-green-900 text-green-400 border border-green-500 hover:bg-green-800' 
              : 'bg-gradient-to-r from-bizflow-600 to-bizflow-500 text-white hover:from-bizflow-500 hover:to-bizflow-400'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isAdminMode ? getLabel(language, 'authRoot') : (isLogin ? getLabel(language, 'loginBtn') : getLabel(language, 'signupBtn'))}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </form>

        <div className="mt-6 flex justify-between items-center text-xs">
          {!isAdminMode && (
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? getLabel(language, 'initNewId') : getLabel(language, 'existUser')}
            </button>
          )}
          
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`ml-auto font-mono uppercase tracking-wider ${isAdminMode ? 'text-red-500 hover:text-red-400' : 'text-gray-600 hover:text-bizflow-400'}`}
          >
            {isAdminMode ? getLabel(language, 'exitGod') : getLabel(language, 'adminAccess')}
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex gap-6 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
        <span className="flex items-center gap-2"><span className={`w-1.5 h-1.5 ${isAdminMode ? 'bg-green-500' : 'bg-bizflow-500'} rounded-full animate-pulse`}></span> {getLabel(language, 'netSecure')}</span>
        <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg> {getLabel(language, 'e2eEncrypt')}</span>
      </div>
    </div>
  );
};

export default AuthScreen;