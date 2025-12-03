import { useState } from 'react';
import { Settings2, MessageSquare, Users, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockIntegrations } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  slack: MessageSquare,
  hubspot: Users,
  intercom: MessageSquare,
  segment: BarChart3,
};

export default function Integrations() {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [configureDialog, setConfigureDialog] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [channel, setChannel] = useState('');

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(int => {
      if (int.id === id) {
        const newEnabled = !int.enabled;
        toast({
          title: newEnabled ? 'Integration enabled' : 'Integration disabled',
          description: `${int.name} has been ${newEnabled ? 'enabled' : 'disabled'}.`,
        });
        return { ...int, enabled: newEnabled };
      }
      return int;
    }));
  };

  const handleSaveConfig = () => {
    toast({
      title: 'Configuration saved',
      description: 'Your integration settings have been updated.',
    });
    setConfigureDialog(null);
    setWebhookUrl('');
    setChannel('');
  };

  return (
    <div className="space-y-6" data-uf-anchor="integrations-settings">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect Flowboard with your favorite tools</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => {
            const Icon = iconMap[integration.icon] || Zap;
            return (
              <div
                key={integration.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
                data-uf-anchor={`integration-${integration.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfigureDialog(integration.id)}
                    data-uf-anchor={`configure-${integration.id}`}
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                    data-uf-anchor={`toggle-${integration.id}`}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Configure Dialog */}
      <Dialog open={configureDialog !== null} onOpenChange={() => setConfigureDialog(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card" data-uf-anchor="integration-config-modal">
          <DialogHeader>
            <DialogTitle>Configure {integrations.find(i => i.id === configureDialog)?.name}</DialogTitle>
            <DialogDescription>
              Set up your integration settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://hooks.example.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                data-uf-anchor="integration-webhook-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channel">Default Channel</Label>
              <Input
                id="channel"
                placeholder="#general"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                data-uf-anchor="integration-channel-input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigureDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfig} data-uf-anchor="save-integration-config">
              Save configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Request Integration</CardTitle>
          <CardDescription>Don't see the integration you need?</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" data-uf-anchor="request-integration-btn">
            Request new integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
