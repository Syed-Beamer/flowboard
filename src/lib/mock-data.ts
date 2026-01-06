import { User, Company, Project, Task, TeamMember, ActivityItem, HelpArticle, Integration } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@flowboard.io',
  role: 'admin',
  createdAt: '2024-01-15T10:00:00Z',
  plan: 'pro',
  trialEndAt: '2024-02-15T10:00:00Z',
  jobRole: 'product_manager',
  teamSize: '6-20',
  region: 'US',
  title: 'Product Lead',
  timezone: 'America/New_York',
  emailNotifications: true,
  weeklySummary: true,
  theme: 'light',
  onboardingCompleted: true,
};

export const mockCompany: Company = {
  id: 'company-1',
  name: 'Acme Corp',
  size: '21-100',
  industry: 'Technology',
  domain: 'acme.io',
  createdAt: '2024-01-10T10:00:00Z',
};

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    companyId: 'company-1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the marketing website with new branding.',
    status: 'active',
    ownerId: 'user-1',
    ownerName: 'Alex Johnson',
    createdAt: '2024-01-20T10:00:00Z',
    startDate: '2024-02-01T00:00:00Z',
    priority: 'high',
    tasksCompleted: 8,
    totalTasks: 12,
  },
  {
    id: 'project-2',
    companyId: 'company-1',
    name: 'Mobile App v2',
    description: 'New features and performance improvements for the mobile application.',
    status: 'active',
    ownerId: 'user-2',
    ownerName: 'Sarah Chen',
    createdAt: '2024-01-25T10:00:00Z',
    startDate: '2024-02-15T00:00:00Z',
    priority: 'medium',
    tasksCompleted: 3,
    totalTasks: 10,
  },
  {
    id: 'project-3',
    companyId: 'company-1',
    name: 'API Documentation',
    description: 'Comprehensive API docs for developer partners.',
    status: 'paused',
    ownerId: 'user-3',
    ownerName: 'Mike Roberts',
    createdAt: '2024-01-18T10:00:00Z',
    startDate: '2024-03-01T00:00:00Z',
    priority: 'low',
    tasksCompleted: 2,
    totalTasks: 5,
  },
  {
    id: 'project-4',
    companyId: 'company-1',
    name: 'Q1 Marketing Campaign',
    description: 'Launch campaign for Q1 product updates.',
    status: 'archived',
    ownerId: 'user-1',
    ownerName: 'Alex Johnson',
    createdAt: '2023-12-15T10:00:00Z',
    startDate: '2024-01-01T00:00:00Z',
    priority: 'high',
    tasksCompleted: 15,
    totalTasks: 15,
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'project-1',
    title: 'Design new homepage mockups',
    description: 'Create 3 design variations for the new homepage.',
    status: 'done',
    assigneeId: 'user-2',
    assigneeName: 'Sarah Chen',
    completedAt: '2024-02-05T15:00:00Z',
    createdAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'task-2',
    projectId: 'project-1',
    title: 'Implement responsive navigation',
    description: 'Build mobile-first responsive navigation component.',
    status: 'in_progress',
    assigneeId: 'user-3',
    assigneeName: 'Mike Roberts',
    completedAt: null,
    createdAt: '2024-01-23T10:00:00Z',
  },
  {
    id: 'task-3',
    projectId: 'project-1',
    title: 'Set up analytics tracking',
    description: 'Integrate Google Analytics and Mixpanel.',
    status: 'backlog',
    assigneeId: null,
    assigneeName: undefined,
    completedAt: null,
    createdAt: '2024-01-24T10:00:00Z',
  },
  {
    id: 'task-4',
    projectId: 'project-1',
    title: 'Write content for About page',
    description: 'Draft copy for the new About Us section.',
    status: 'in_progress',
    assigneeId: 'user-1',
    assigneeName: 'Alex Johnson',
    completedAt: null,
    createdAt: '2024-01-25T10:00:00Z',
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    userId: 'user-1',
    companyId: 'company-1',
    name: 'Alex Johnson',
    email: 'alex@flowboard.io',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'tm-2',
    userId: 'user-2',
    companyId: 'company-1',
    name: 'Sarah Chen',
    email: 'sarah@flowboard.io',
    role: 'member',
    status: 'active',
    joinedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'tm-3',
    userId: 'user-3',
    companyId: 'company-1',
    name: 'Mike Roberts',
    email: 'mike@flowboard.io',
    role: 'member',
    status: 'active',
    joinedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'tm-4',
    userId: 'user-4',
    companyId: 'company-1',
    name: 'Emma Wilson',
    email: 'emma@flowboard.io',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2024-02-01T10:00:00Z',
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'activity-1',
    projectId: 'project-1',
    userId: 'user-1',
    userName: 'Alex Johnson',
    action: 'created',
    description: 'created the project',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'activity-2',
    projectId: 'project-1',
    userId: 'user-2',
    userName: 'Sarah Chen',
    action: 'completed',
    description: 'completed task "Design new homepage mockups"',
    createdAt: '2024-02-05T15:00:00Z',
  },
  {
    id: 'activity-3',
    projectId: 'project-1',
    userId: 'user-3',
    userName: 'Mike Roberts',
    action: 'started',
    description: 'started working on "Implement responsive navigation"',
    createdAt: '2024-02-06T09:00:00Z',
  },
  {
    id: 'activity-4',
    projectId: 'project-1',
    userId: 'user-1',
    userName: 'Alex Johnson',
    action: 'added',
    description: 'added 2 new tasks',
    createdAt: '2024-02-07T11:00:00Z',
  },
];

export const mockHelpArticles: HelpArticle[] = [
  {
    id: "article-1",
    title: "How projects work in Flowboard",
    category: "Getting Started",
    information: `
Projects are the primary organizational unit in Flowboard. Every task, timeline, and collaboration event exists within the context of a project. A project represents a real-world initiative such as a product launch, internal migration, customer onboarding flow, or marketing campaign.

When a project is created, it is assigned an owner. The owner is responsible for maintaining project structure, updating priorities, and ensuring tasks move forward. Ownership does not restrict collaboration—any team member with sufficient permissions can contribute—but it provides accountability.

Projects support prioritization levels (Low, Medium, High), which are used by the dashboard and analytics views to surface critical work. Changing a project’s priority does not affect task-level priority automatically; tasks remain independently configurable to avoid unintended workflow disruption.

Projects can exist in one of three states: Active, Archived, or Deleted. Active projects are editable and appear across dashboards. Archived projects are read-only and excluded from most views but preserved for historical reference and reporting. Deleted projects are permanently removed and cannot be restored.

Projects do not enforce a strict workflow by default. This is intentional—Flowboard allows teams to adapt task structure organically. Teams that require stricter workflows can enable custom workflows on higher plans.

From an AI assistant perspective, projects act as context boundaries. Suggestions, summaries, and recommendations should always be scoped to the currently active project unless explicitly stated otherwise.
`,
  },

  {
    id: "article-2",
    title: "Inviting teammates and collaboration rules",
    category: "Team Management",
    information: `
Flowboard is designed for collaborative work across teams of varying sizes. Team members are invited at the workspace level, not per project. Once invited, a member can be added to multiple projects without needing additional invitations.

There are three core roles: Admin, Member, and Viewer. Admins have full access to workspace settings, billing, security, and integrations. Members can create and manage projects and tasks but cannot modify billing or security settings. Viewers have read-only access and cannot make changes.

Invitations are sent via email and remain valid until accepted or revoked. If an invited user does not join, their invitation does not consume a paid seat. Seats are only counted once a user accepts an invitation.

Removing a team member immediately revokes access but does not delete their historical contributions. Tasks they owned remain assigned to them until reassigned manually. This prevents accidental loss of ownership context.

Flowboard does not currently support granular per-project permission overrides. This is a deliberate design choice to keep permission logic predictable and avoid complex access conflicts. Enterprise plans may support advanced access controls.

For AI assistance, role awareness is critical. The assistant should avoid suggesting actions a user is not permitted to perform, such as billing changes for non-admins, and should adjust guidance accordingly.
`,
  },

  {
    id: "article-3",
    title: "Task lifecycle and status management",
    category: "Projects",
    information: `
Tasks represent the smallest unit of work in Flowboard. Each task belongs to exactly one project and progresses through a defined lifecycle. By default, tasks move through Backlog, In Progress, and Done, but this can be customized depending on plan and team needs.

Task status is intentionally lightweight. Changing a task’s status does not trigger automatic side effects such as reassignment or notifications unless configured via integrations. This ensures teams maintain full control over how work progresses.

Tasks can have assignees, due dates, descriptions, and comments. Assignees are responsible for execution, but tasks remain visible to the entire project team. Due dates are advisory and used for reminders and dashboard insights rather than enforcement.

A task marked as Done is considered complete but not immutable. Tasks can be reopened if additional work is required. This flexibility reflects real-world workflows where requirements evolve.

Flowboard avoids rigid task hierarchies. While tasks can reference related work, there is no strict parent-child dependency enforcement. This reduces complexity and prevents blocked workflows.

From an AI standpoint, task status is a key signal. Recommendations, summaries, and alerts should prioritize tasks that are overdue, high priority, or stuck in In Progress for extended periods.
`,
  },

  {
    id: "article-4",
    title: "Billing model and plan behavior",
    category: "Billing",
    information: `
Flowboard uses a subscription-based billing model tied to the workspace. Billing is managed exclusively by Admin users to prevent accidental changes and ensure financial accountability.

Plans are billed per active seat. A seat is considered active when a user has accepted an invitation. Pending invitations do not count toward billing. Removing a user frees up a seat immediately.

Plan upgrades take effect instantly, unlocking features without requiring a reload or restart. Downgrades are scheduled to take effect at the end of the current billing cycle to prevent data loss or sudden feature removal.

Invoices are generated automatically at the start of each billing period. Payment failures may result in temporary feature restrictions but do not immediately suspend access. Admins are notified to resolve payment issues.

Flowboard does not delete data upon downgrade. Features may become inaccessible, but underlying data is preserved in case of a future upgrade.

For AI assistance, billing guidance must be cautious. The assistant should explain implications clearly, avoid making billing changes autonomously, and always confirm intent before guiding users toward plan changes.
`,
  },

  {
    id: "article-5",
    title: "How integrations interact with Flowboard data",
    category: "Integrations",
    information: `
Integrations extend Flowboard by connecting it with external systems such as Slack, Intercom, HubSpot, and analytics platforms. Integrations operate at the workspace level and require Admin permissions to configure.

Each integration has a defined scope. For example, Slack integrations primarily handle notifications, while CRM integrations focus on data synchronization. Integrations do not have unrestricted access to all workspace data.

Flowboard follows a pull-and-push hybrid model. Some integrations push events in real time (e.g., task updates to Slack), while others pull data periodically based on configuration.

Disconnecting an integration immediately stops data flow but does not delete previously synced data. This ensures historical records remain intact for reporting and audits.

Rate limits and API quotas are respected to avoid performance degradation. If an integration fails due to external service issues, Flowboard retries automatically and surfaces errors to Admins when intervention is required.

AI assistants should treat integrations as secondary actors. Recommendations involving integrations should explain consequences clearly and avoid assumptions about external system state unless confirmed.
`,
  },
];



export const mockIntegrations: Integration[] = [
  {
    id: 'int-slack',
    name: 'Slack',
    description: 'Get notifications and updates in Slack channels.',
    enabled: true,
    icon: 'slack',
  },
  {
    id: 'int-hubspot',
    name: 'HubSpot',
    description: 'Sync contacts and deals with HubSpot CRM.',
    enabled: false,
    icon: 'hubspot',
  },
  {
    id: 'int-intercom',
    name: 'Intercom',
    description: 'Connect customer conversations with projects.',
    enabled: true,
    icon: 'intercom',
  },
  {
    id: 'int-segment',
    name: 'Segment',
    description: 'Send events and user data to Segment.',
    enabled: false,
    icon: 'segment',
  },
];
