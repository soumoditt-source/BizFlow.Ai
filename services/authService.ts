import { UserProfile, SavedProject, StartupPlan, Language, DeploymentRecord } from '../types';
import { LoggerService } from './loggerService';

const USER_KEY = 'bizflow_secure_user';
const PROJECTS_KEY = 'bizflow_secure_projects';
const LEDGER_KEY = 'bizflow_global_ledger';

const ADMIN_EMAIL = "soumoditt@gmail.com";
const ADMIN_PASS = "Soumo@05072005"; 

export const AuthService = {
  login: (email: string, passOrName: string): UserProfile => {
    let isAdmin = false;

    if (email === ADMIN_EMAIL && passOrName === ADMIN_PASS) {
      isAdmin = true;
    }

    const user: UserProfile = {
      id: btoa(email + Date.now()),
      email,
      name: isAdmin ? "Supreme Architect" : passOrName,
      isAdmin,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    LoggerService.log(email, 'LOGIN_SUCCESS', `User logged in. Admin: ${isAdmin}`, isAdmin ? 'HIGH' : 'LOW');
    return user;
  },

  updateUserKYC: (email: string, govId: string, phone: string, address: string) => {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      const user: UserProfile = JSON.parse(data);
      if (user.email === email) {
        user.govId = govId;
        user.phone = phone;
        user.address = address;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        LoggerService.log(email, 'KYC_UPDATE', 'User updated KYC details for contract', 'MEDIUM');
        return user;
      }
    }
    return null;
  },

  logout: () => {
    const user = AuthService.getCurrentUser();
    if (user) LoggerService.log(user.email, 'LOGOUT', 'Session terminated', 'LOW');
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
    LoggerService.log(userEmail, 'PROJECT_SAVE', `Saved project: ${newProject.name}`, 'LOW');
  },

  recordDeployment: (userEmail: string, plan: StartupPlan, signerInfo: { name: string, govId: string, phone: string }) => {
    const existingLedger = localStorage.getItem(LEDGER_KEY);
    const records: DeploymentRecord[] = existingLedger ? JSON.parse(existingLedger) : [];

    const record: DeploymentRecord = {
      id: crypto.randomUUID(),
      userEmail,
      projectName: plan.branding.name,
      valuation: "Pending Assessment",
      royaltyStake: "13% (Irrevocable)",
      deployedAt: new Date().toISOString(),
      contractHash: btoa(plan.branding.name + userEmail + Date.now()),
      signerName: signerInfo.name,
      signerGovId: signerInfo.govId,
      signerPhone: signerInfo.phone
    };

    records.push(record);
    localStorage.setItem(LEDGER_KEY, JSON.stringify(records));
    
    LoggerService.log(userEmail, 'DEPLOYMENT_EXECUTION', `Contract Signed & Deployed: ${plan.branding.name}. Signer: ${signerInfo.name}`, 'CRITICAL');
    return record;
  },

  getGlobalLedger: (): DeploymentRecord[] => {
    const data = localStorage.getItem(LEDGER_KEY);
    return data ? JSON.parse(data) : [];
  }
};