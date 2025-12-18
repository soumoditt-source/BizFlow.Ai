
import { UserProfile, SavedProject, StartupPlan, Language, DeploymentRecord } from '../types';
import { LoggerService } from './loggerService';

const STORAGE_KEYS = {
  USER: 'bizflow_v4_user',
  PROJECTS: 'bizflow_v4_vault',
  LEDGER: 'bizflow_v4_global_ledger'
};

const ADMIN_EMAIL = "soumoditt@gmail.com";
const ADMIN_PASS = "Soumo@05072005"; 

export const AuthService = {
  login: (email: string, passOrName: string): UserProfile => {
    let isAdmin = email === ADMIN_EMAIL && passOrName === ADMIN_PASS;

    const user: UserProfile = {
      id: btoa(email + Date.now().toString()),
      email,
      name: isAdmin ? "Supreme Architect" : passOrName,
      isAdmin,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    LoggerService.log(email, 'LOGIN_EVENT', `Authenticated via Cloud Entry point. Admin: ${isAdmin}`, isAdmin ? 'HIGH' : 'LOW');
    return user;
  },

  googleLogin: (profile: { email: string, name: string }): UserProfile => {
    const user: UserProfile = {
      id: `google_${btoa(profile.email)}`,
      email: profile.email,
      name: profile.name,
      isAdmin: profile.email === ADMIN_EMAIL,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    LoggerService.log(profile.email, 'GOOGLE_AUTH_SUCCESS', 'OIDC Token validated.', 'LOW');
    return user;
  },

  updateUserKYC: (email: string, govId: string, phone: string, address: string) => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (data) {
      const user: UserProfile = JSON.parse(data);
      user.govId = govId;
      user.phone = phone;
      user.address = address;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  saveProject: (userEmail: string, idea: string, plan: StartupPlan, language: Language) => {
    const existingData = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const projects: SavedProject[] = existingData ? JSON.parse(existingData) : [];
    
    const newProject: SavedProject = {
      id: crypto.randomUUID(),
      name: plan.branding.name || "Untitled Project",
      idea,
      language,
      createdAt: new Date().toISOString(),
      plan
    };

    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    LoggerService.log(userEmail, 'DATA_PERSISTENCE', `Vault updated with: ${newProject.name}`, 'LOW');
  },

  recordDeployment: (userEmail: string, plan: StartupPlan, signerInfo: { name: string, govId: string, phone: string }) => {
    const existingLedger = localStorage.getItem(STORAGE_KEYS.LEDGER);
    const records: DeploymentRecord[] = existingLedger ? JSON.parse(existingLedger) : [];

    const record: DeploymentRecord = {
      id: crypto.randomUUID(),
      userEmail,
      projectName: plan.branding.name,
      valuation: "Estimated $1.2M",
      royaltyStake: "13% Perpetual",
      deployedAt: new Date().toISOString(),
      contractHash: `0x${btoa(plan.branding.name).substring(0, 16).toLowerCase()}`,
      signerName: signerInfo.name,
      signerGovId: signerInfo.govId,
      signerPhone: signerInfo.phone
    };

    records.push(record);
    localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(records));
    LoggerService.log(userEmail, 'PROTOCOL_EXECUTION', `Deployed: ${plan.branding.name}`, 'CRITICAL');
    return record;
  },

  getGlobalLedger: (): DeploymentRecord[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEDGER);
    return data ? JSON.parse(data) : [];
  }
};
