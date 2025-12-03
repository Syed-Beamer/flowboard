import { useState } from 'react';
import { Copy, RefreshCw, Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Api() {
  const { toast } = useToast();
  const [showKey, setShowKey] = useState(false);
  const [apiKey] = useState('sk_live_4eC39HqLyjWDarjtT1zdp7dc2hB3L9vNk5mPQ1wX');

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: 'API key copied',
      description: 'The API key has been copied to your clipboard.',
    });
  };

  const handleRegenerate = () => {
    toast({
      title: 'API key regenerated',
      description: 'A new API key has been generated. Update your integrations.',
    });
  };

  const maskedKey = apiKey.replace(/(.{7}).*(.{4})/, '$1••••••••••••••••$2');

  return (
    <div className="space-y-6" data-uf-anchor="api-settings">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>API Key</CardTitle>
              <CardDescription>Use this key to authenticate API requests</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={showKey ? apiKey : maskedKey}
              readOnly
              className="font-mono text-sm bg-muted"
              data-uf-anchor="api-key-display"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowKey(!showKey)}
              data-uf-anchor="toggle-api-key-visibility"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              id="copy-api-key-btn"
              data-uf-anchor="copy-api-key-btn"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm font-medium">Regenerate API key</p>
              <p className="text-xs text-muted-foreground">
                This will invalidate your current key immediately
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleRegenerate}
              id="regenerate-api-key-btn"
              data-uf-anchor="regenerate-api-key-btn"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate key
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to integrate with Flowboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-2">Quick Start</p>
            <pre className="text-xs bg-background rounded p-3 overflow-x-auto">
{`curl -X GET https://api.flowboard.io/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
            </pre>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-primary hover:underline"
              data-uf-anchor="api-docs-link"
            >
              View full documentation →
            </a>
            <a
              href="#"
              className="text-sm text-primary hover:underline"
              data-uf-anchor="api-examples-link"
            >
              API examples →
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Receive real-time updates via HTTP callbacks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No webhooks configured</p>
            <Button variant="outline" data-uf-anchor="add-webhook-btn">
              Add webhook endpoint
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
