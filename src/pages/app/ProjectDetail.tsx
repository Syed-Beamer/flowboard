import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MoreHorizontal,
  Edit,
  Archive,
  Trash2,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { mockProjects, mockTasks, mockActivities } from '@/lib/mock-data';
import { TaskStatus } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const statusVariantMap = {
  active: 'active' as const,
  paused: 'paused' as const,
  archived: 'archived' as const,
};

const taskStatusColors: Record<TaskStatus, string> = {
  backlog: 'bg-muted',
  in_progress: 'bg-primary',
  done: 'bg-success',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);
  const projectTasks = mockTasks.filter((t) => t.projectId === id);
  const projectActivities = mockActivities.filter((a) => a.projectId === id);
  const [tasks, setTasks] = useState(projectTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { toast } = useToast();

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const toggleTaskDone = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus: TaskStatus = task.status === 'done' ? 'backlog' : 'done';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: `task-${Date.now()}`,
        projectId: id!,
        title: newTaskTitle,
        description: '',
        status: 'backlog' as TaskStatus,
        assigneeId: null,
        completedAt: null,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setIsAddingTask(false);
      toast({
        title: 'Task added',
        description: `"${newTaskTitle}" has been added to the project.`,
      });
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in" data-uf-anchor="project-detail-page">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Link
            to="/app/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to projects
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
            <Badge variant={statusVariantMap[project.status]} className="capitalize">
              {project.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" id="edit-project-btn" data-uf-anchor="edit-project-btn">
                <Edit className="mr-2 h-4 w-4" />
                Edit project
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-card" data-uf-anchor="edit-project-panel">
              <SheetHeader>
                <SheetTitle>Edit project</SheetTitle>
                <SheetDescription>
                  Make changes to your project settings here.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Project name</Label>
                  <Input defaultValue={project.name} data-uf-anchor="edit-project-name" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea defaultValue={project.description} data-uf-anchor="edit-project-description" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={project.status}>
                    <SelectTrigger data-uf-anchor="edit-project-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full mt-4" data-uf-anchor="save-project-btn">
                  Save changes
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" data-uf-anchor="project-more-actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6" data-uf-anchor="project-tabs">
        <TabsList>
          <TabsTrigger value="overview" data-uf-anchor="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks" data-uf-anchor="tab-tasks">Tasks</TabsTrigger>
          <TabsTrigger value="activity" data-uf-anchor="tab-activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-medium">{project.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-medium capitalize">{project.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start date</span>
                  <span className="font-medium">
                    {project.startDate ? format(new Date(project.startDate), 'MMM d, yyyy') : 'Not set'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Tasks completed in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary">
                    <span className="text-2xl font-bold">
                      {Math.round(((project.tasksCompleted || 0) / (project.totalTasks || 1)) * 100)}%
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {project.tasksCompleted} / {project.totalTasks} tasks
                    </p>
                    <p className="text-sm text-muted-foreground">completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4" data-uf-anchor="tasks-tab-content">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">All tasks</h3>
            <Button
              size="sm"
              onClick={() => setIsAddingTask(true)}
              id="add-task-btn"
              data-uf-anchor="add-task-btn"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add task
            </Button>
          </div>

          <div className="space-y-2">
            {isAddingTask && (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 animate-slide-up">
                <Input
                  placeholder="Task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  autoFocus
                  data-uf-anchor="new-task-input"
                />
                <Button size="sm" onClick={handleAddTask} data-uf-anchor="confirm-add-task">
                  Add
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
              </div>
            )}

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-muted/50 transition-colors"
                data-uf-anchor={`task-item-${task.id}`}
              >
                <Checkbox
                  checked={task.status === 'done'}
                  onCheckedChange={() => toggleTaskDone(task.id)}
                  data-uf-anchor={`task-checkbox-${task.id}`}
                />
                <span className={cn(
                  'flex-1',
                  task.status === 'done' && 'line-through text-muted-foreground'
                )}>
                  {task.title}
                </span>
                <Select
                  defaultValue={task.status}
                  onValueChange={(value) => {
                    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: value as TaskStatus } : t));
                  }}
                >
                  <SelectTrigger className="w-[130px] h-8" data-uf-anchor={`task-status-${task.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue={task.assigneeId || 'unassigned'}>
                  <SelectTrigger className="w-[130px] h-8" data-uf-anchor={`task-assignee-${task.id}`}>
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="user-1">Alex Johnson</SelectItem>
                    <SelectItem value="user-2">Sarah Chen</SelectItem>
                    <SelectItem value="user-3">Mike Roberts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4" data-uf-anchor="activity-tab-content">
          <div className="space-y-4">
            {projectActivities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  {index < projectActivities.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm">
                    <span className="font-medium">{activity.userName}</span>{' '}
                    <span className="text-muted-foreground">{activity.description}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(activity.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
