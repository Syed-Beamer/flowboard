export type UserRole = 'admin' | 'member' | 'viewer';
export type Plan = 'free' | 'pro' | 'enterprise';
export type JobRole = 'product_manager' | 'engineer' | 'designer' | 'other';
export type TeamSize = '1-5' | '6-20' | '21-100' | '100+';
export type ProjectStatus = 'active' | 'paused' | 'archived';
export type TaskStatus = 'backlog' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  plan: Plan;
  trialEndAt: string | null;
  jobRole: JobRole | null;
  teamSize: TeamSize | null;
  region: string | null;
  avatarUrl?: string;
  title?: string;
  timezone?: string;
  emailNotifications?: boolean;
  weeklySummary?: boolean;
  theme?: 'light' | 'dark' | 'system';
  onboardingCompleted?: boolean;
}

export interface Company {
  id: string;
  name: string;
  size: TeamSize | null;
  industry: string | null;
  domain: string | null;
  createdAt: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
  ownerName?: string;
  createdAt: string;
  startDate: string | null;
  priority: Priority;
  tasksCompleted?: number;
  totalTasks?: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string | null;
  assigneeName?: string;
  completedAt: string | null;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  companyId: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  createdAt: string;
}

export interface HelpArticle {
 id: string;
  title: string;
  category: string;
  information: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}
