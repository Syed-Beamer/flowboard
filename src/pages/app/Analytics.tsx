import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, FolderKanban, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: FolderKanban,
  },
  {
    name: 'Tasks Completed',
    value: '156',
    change: '+28',
    trend: 'up',
    icon: CheckCircle2,
  },
  {
    name: 'Active Users',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Avg. Completion Time',
    value: '4.2 days',
    change: '-0.5',
    trend: 'down',
    icon: Clock,
  },
];

const teamPerformance = [
  { name: 'Alex Johnson', tasks: 24, percentage: 85 },
  { name: 'Sarah Chen', tasks: 18, percentage: 72 },
  { name: 'Mike Roberts', tasks: 15, percentage: 60 },
  { name: 'Emma Wilson', tasks: 12, percentage: 48 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 animate-fade-in" data-uf-anchor="analytics-page">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your team's performance and productivity</p>
        </div>
        
        <Select defaultValue="30d">
          <SelectTrigger className="w-[150px]" data-uf-anchor="analytics-period-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-uf-anchor="analytics-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <TrendIcon className="mr-1 h-3 w-3" />
                  {stat.change} from last period
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Status Distribution */}
        <Card data-uf-anchor="project-status-chart">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Distribution of projects by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active</span>
                <span className="text-muted-foreground">6 projects (50%)</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paused</span>
                <span className="text-muted-foreground">4 projects (33%)</span>
              </div>
              <Progress value={33} className="h-2 [&>div]:bg-warning" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Archived</span>
                <span className="text-muted-foreground">2 projects (17%)</span>
              </div>
              <Progress value={17} className="h-2 [&>div]:bg-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card data-uf-anchor="team-performance-chart">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Tasks completed by team member</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamPerformance.map((member) => (
              <div key={member.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{member.name}</span>
                  <span className="text-muted-foreground">{member.tasks} tasks</span>
                </div>
                <Progress value={member.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card data-uf-anchor="activity-summary">
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Weekly activity breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">42</div>
              <div className="text-sm text-muted-foreground">Tasks Created</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-success">38</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">New Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
