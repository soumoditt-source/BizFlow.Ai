import { UserProfile, SavedProject, StartupPlan, Language, DeploymentRecord } from '../types';

const USER_KEY = 'bizflow_secure_user';
const PROJECTS_KEY = 'bizflow_secure_projects';
const LEDGER_KEY = 'bizflow_global_ledger'; // The "Un-erasable" record simulation

const ADMIN_EMAIL = "soumoditt@gmail.com";
// In real app, verify hash. Here we check plain text for the specific requirement.
const ADMIN_PASS = "Soumo@05072005"; 

export const AuthService = {
  login: (email: string, passOrName: string): UserProfile => {
    let isAdmin = false;

    // Check for Specific Admin Credentials
    if (email === ADMIN_EMAIL && passOrName === ADMIN_PASS) {
      isAdmin = true;
    }

    const user: UserProfile = {
      id: btoa(email + Date.now()),
      email,
      name: isAdmin ? "Supreme Architect" : passOrName, // If logging in as user, passOrName is name. If admin, it's pass.
      isAdmin,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: (): UserProfile | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveProject: (userEmail: string, idea: string, plan: StartupPlan, language: Language) => {
    const existingData = localStorage.getItem(PROJECTS_KEY);
    const projects: SavedProject[] = existingData ? JSON.parse(existingData) : [];
    
    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: plan.branding.name || "Untitled Project",
      idea,
      language,
      createdAt: new Date().toISOString(),
      plan
    };

    projects.push(newProject);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  // The "Un-erasable" Ledger Function
  recordDeployment: (userEmail: string, plan: StartupPlan) => {
    const existingLedger = localStorage.getItem(LEDGER_KEY);
    const records: DeploymentRecord[] = existingLedger ? JSON.parse(existingLedger) : [];

    const record: DeploymentRecord = {
      id: crypto.randomUUID(),
      userEmail,
      projectName: plan.branding.name,
      valuation: "Pending Assessment",
      royaltyStake: "13% (Irrevocable)",
      deployedAt: new Date().toISOString(),
      contractHash: btoa(plan.branding.name + userEmail + Date.now()) // Simulated Hash
    };

    records.push(record);
    localStorage.setItem(LEDGER_KEY, JSON.stringify(records));
    
    // Notify "HQ" (Console log as fallback for now, real app would POST)
    console.log("Transmission to HQ (Soumoditya Das):", record);
    return record;
  },

  getGlobalLedger: (): DeploymentRecord[] => {
    const data = localStorage.getItem(LEDGER_KEY);
    return data ? JSON.parse(data) : [];
  }
};