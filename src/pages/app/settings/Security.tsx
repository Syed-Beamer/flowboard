import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Security() {
  const { toast } = useToast();
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [acsUrl, setAcsUrl] = useState('');
  const [entityId, setEntityId] = useState('');
  const [certificate, setCertificate] = useState('');

  const handleSave = () => {
    toast({
      title: 'SSO settings saved',
      description: 'Your SAML/SSO configuration has been updated.',
    });
  };

  return (
    <div className="space-y-6" data-uf-anchor="security-settings">
      {/* SSO Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>SAML/SSO Configuration</CardTitle>
              <CardDescription>Configure single sign-on for your organization</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable SSO Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Enable SSO</Label>
              <p className="text-sm text-muted-foreground">
                Allow team members to sign in using your identity provider
              </p>
            </div>
            <Switch
              checked={ssoEnabled}
              onCheckedChange={setSsoEnabled}
              data-uf-anchor="sso-enable-toggle"
            />
          </div>

          {ssoEnabled && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="acs-url">ACS URL (Assertion Consumer Service)</Label>
                <Input
                  id="acs-url"
                  placeholder="https://your-idp.com/acs"
                  value={acsUrl}
                  onChange={(e) => setAcsUrl(e.target.value)}
                  data-uf-anchor="sso-acs-url-input"
                />
                <p className="text-xs text-muted-foreground">
                  The URL where your IdP will send SAML responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entity-id">Entity ID (Issuer)</Label>
                <Input
                  id="entity-id"
                  placeholder="https://your-idp.com/entity"
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  data-uf-anchor="sso-entity-id-input"
                />
                <p className="text-xs text-muted-foreground">
                  A unique identifier for your service provider
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificate">x509 Certificate</Label>
                <Textarea
                  id="certificate"
                  placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  className="font-mono text-xs min-h-[120px]"
                  data-uf-anchor="sso-certificate-input"
                />
                <p className="text-xs text-muted-foreground">
                  The public certificate from your identity provider
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>Enforce password requirements for your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Minimum 8 characters</Label>
              <p className="text-sm text-muted-foreground">Require at least 8 characters</p>
            </div>
            <Switch defaultChecked data-uf-anchor="password-min-length-toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require uppercase</Label>
              <p className="text-sm text-muted-foreground">At least one uppercase letter</p>
            </div>
            <Switch defaultChecked data-uf-anchor="password-uppercase-toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require numbers</Label>
              <p className="text-sm text-muted-foreground">At least one number</p>
            </div>
            <Switch data-uf-anchor="password-numbers-toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require special characters</Label>
              <p className="text-sm text-muted-foreground">At least one special character</p>
            </div>
            <Switch data-uf-anchor="password-special-toggle" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} id="save-sso-btn" data-uf-anchor="save-sso-btn">
          Save SSO settings
        </Button>
      </div>
    </div>
  );
}
