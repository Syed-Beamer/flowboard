import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle2,
  Users,
  ArrowUpRight,
  Plus,
  UserPlus,
  Sparkles,
  X,
  Info,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const stats = [
  { name: 'Active Projects', value: '4', change: '+2 this week', icon: FolderKanban, trend: 'up' },
  { name: 'Tasks Completed', value: '28', change: '+12 this week', icon: CheckCircle2, trend: 'up' },
  { name: 'Team Members', value: '8', change: '+1 pending', icon: Users, trend: 'neutral' },
];

export default function Dashboard() {
  const [showBanner, setShowBanner] = useState(true);
  const { user } = useAuth();

  const trialDaysLeft = user?.trialEndAt
    ? Math.max(0, Math.ceil((new Date(user.trialEndAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="p-6 space-y-6 animate-fade-in" data-uf-anchor="dashboard-page">
      {/* Trial Banner */}
      {showBanner && user?.plan === 'pro' && trialDaysLeft > 0 && (
        <div
          className="relative flex items-center justify-between rounded-lg bg-primary/10 border border-primary/20 px-4 py-3"
          data-uf-anchor="trial-banner"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-medium">Your trial ends in {trialDaysLeft} days.</span>{' '}
              Upgrade now to keep all Pro features.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app/settings/billing">
              <Button size="sm" data-uf-anchor="upgrade-banner-btn">
                Upgrade now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowBanner(false)}
              data-uf-anchor="dismiss-banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your projects.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/projects">
            <Button variant="outline" id="view-projects-btn" data-uf-anchor="view-projects-btn">
              View all projects
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3" data-uf-anchor="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to see detailed {stat.name.toLowerCase()} metrics</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className={cn(
                    'flex items-center text-xs',
                    stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'
                  )}>
                    {stat.trend === 'up' && <TrendingUp className="mr-1 h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
              </CardContent>
              <div className="absolute right-4 top-4 opacity-10">
                <Icon className="h-16 w-16" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Section */}
        <Card className="lg:col-span-2" data-uf-anchor="progress-card">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Tasks completed across all projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Website Redesign</span>
                <span className="text-muted-foreground">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mobile App v2</span>
                <span className="text-muted-foreground">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Documentation</span>
                <span className="text-muted-foreground">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card data-uf-anchor="quick-actions-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/app/projects" className="block">
              <Button
                variant="outline"
                className="w-full justify-start"
                id="create-project-btn"
                data-uf-anchor="create-project-btn"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first project
              </Button>
            </Link>
            <Link to="/app/settings/team" className="block">
              <Button
                variant="outline"
                className="w-full justify-start"
                id="invite-teammate-btn"
                data-uf-anchor="invite-teammate-btn"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite teammates
              </Button>
            </Link>
            <Link to="/app/settings/billing" className="block">
              <Button
                variant="outline"
                className="w-full justify-start"
                id="upgrade-plan-btn"
                data-uf-anchor="upgrade-plan-btn"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card data-uf-anchor="recent-activity-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'Sarah Chen', action: 'completed', item: 'Design new homepage mockups', time: '2 hours ago' },
              { user: 'Mike Roberts', action: 'started', item: 'Implement responsive navigation', time: '4 hours ago' },
              { user: 'You', action: 'created', item: 'API Documentation project', time: '1 day ago' },
              { user: 'Emma Wilson', action: 'commented on', item: 'Website Redesign', time: '2 days ago' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
