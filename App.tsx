import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import IdeaInput from './components/IdeaInput';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import AuthScreen from './components/AuthScreen';
import TutorialModal from './components/TutorialModal';
import AdminPanel from './components/AdminPanel';
import { generateStartupPlan } from './services/geminiService';
import { AuthService } from './services/authService';
import { StartupPlan, UserProfile, Language } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentIdea, setCurrentIdea] = useState<string>('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (email: string, passOrName: string) => {
    const loggedUser = AuthService.login(email, passOrName);
    setUser(loggedUser);
    if (!loggedUser.isAdmin) setShowTutorial(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setPlan(null);
    setShowAdminPanel(false);
  };

  const handleIdeaSubmit = async (idea: string) => {
    setLoading(true);
    setError(null);
    setCurrentIdea(idea);
    try {
      const generatedPlan = await generateStartupPlan(idea, language);
      setPlan(generatedPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = () => {
    if (user && plan) {
      AuthService.saveProject(user.email, currentIdea, plan, language);
      alert("Project saved securely to your account vault.");
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <>
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
      
      <Layout 
        user={user} 
        onLogout={handleLogout}
        selectedLang={language}
        onLangChange={setLanguage}
        onOpenAdmin={() => setShowAdminPanel(true)}
      >
        {!user ? (
          <AuthScreen onLogin={handleLogin} language={language} />
        ) : (
          <>
             {error && (
              <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 max-w-3xl mx-auto flex justify-between items-center animate-fade-in">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-sm underline hover:text-white">Dismiss</button>
              </div>
            )}

            {!plan && !loading && (
              <IdeaInput onSubmit={handleIdeaSubmit} isGenerating={loading} language={language} />
            )}

            {loading && <LoadingScreen />}

            {plan && !loading && (
              <Dashboard 
                plan={plan} 
                onReset={handleReset} 
                onSave={handleSaveProject}
                language={language}
              />
            )}

            {showTutorial && (
              <TutorialModal onClose={() => setShowTutorial(false)} language={language} />
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default App;