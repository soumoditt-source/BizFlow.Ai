import { AuditLog, UserFeedback } from '../types';

const LOGS_KEY = 'bizflow_audit_logs';
const FEEDBACK_KEY = 'bizflow_user_feedback';
const SESSION_ID = crypto.randomUUID();

export const LoggerService = {
  log: (userEmail: string, action: string, details: string, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW') => {
    const existingLogs = localStorage.getItem(LOGS_KEY);
    const logs: AuditLog[] = existingLogs ? JSON.parse(existingLogs) : [];

    const newLog: AuditLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      userEmail: userEmail || 'ANONYMOUS',
      action,
      details,
      sessionId: SESSION_ID,
      riskLevel
    };

    // Keep logs manageable (max 1000)
    if (logs.length > 1000) logs.shift();
    
    logs.push(newLog);
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    
    // In a real app, this would fire a background beacon
    // console.debug(`[AUDIT] ${action}: ${details}`);
  },

  getLogs: (): AuditLog[] => {
    const data = localStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data).reverse() : [];
  },

  submitFeedback: (feedback: UserFeedback) => {
    const existing = localStorage.getItem(FEEDBACK_KEY);
    const list: UserFeedback[] = existing ? JSON.parse(existing) : [];
    list.push(feedback);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));
    LoggerService.log(feedback.userEmail, 'FEEDBACK_SUBMITTED', `Rating: ${feedback.rating}/5 for ${feedback.projectName}`, 'LOW');
  },

  getFeedback: (): UserFeedback[] => {
    const data = localStorage.getItem(FEEDBACK_KEY);
    return data ? JSON.parse(data).reverse() : [];
  }
};