import React, { useEffect, useState } from 'react';
import { getLabel } from '../utils/i18n';
import { Language } from '../types';

interface Props {
  language?: Language;
}

const LoadingScreen: React.FC<Props> = ({ language = Language.ENGLISH }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Simulating Executive Boardroom...",
    "CEO Navigating Strategic Direction...",
    "CTO Auditing Tech Stack...",
    "CFO Modeling Unit Economics...",
    "CMO Refining Brand Resonance...",
    "VC Scoring Investability...",
    "Grounding Market Intelligence...",
    "Synthesis Complete. Building Empire..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-dark-card rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-bizflow-500 border-r-bizflow-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-bizflow-500/10 rounded-full animate-pulse"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Multi-Agent Deliberation In Progress</h2>
      <p className="text-bizflow-400 font-mono text-lg h-8 text-center px-4">
        {steps[currentStep]}
      </p>
      
      <div className="mt-8 max-w-md text-center text-sm text-dark-muted">
        10 world-class entrepreneurs are working on a single project to build the ultimate version of your request.
      </div>
    </div>
  );
};

export default LoadingScreen;