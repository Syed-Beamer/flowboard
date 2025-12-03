import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCompany } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Media',
  'Other',
];

export default function Company() {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState(mockCompany.name);
  const [size, setSize] = useState<string>(mockCompany.size || '21-100');
  const [industry, setIndustry] = useState(mockCompany.industry || 'Technology');
  const [website, setWebsite] = useState(mockCompany.domain || '');
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    toast({
      title: 'Company settings updated',
      description: 'Your company information has been saved.',
    });
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="space-y-6" data-uf-anchor="company-settings">
      {/* Success Banner */}
      {showSaved && (
        <div className="flex items-center gap-2 rounded-lg bg-success/10 border border-success/20 px-4 py-3 animate-slide-up" data-uf-anchor="company-saved-banner">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <span className="text-sm font-medium text-success">Changes saved successfully</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company name</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              data-uf-anchor="company-name-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger data-uf-anchor="company-size-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-20">6-20 employees</SelectItem>
                  <SelectItem value="21-100">21-100 employees</SelectItem>
                  <SelectItem value="100+">100+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger data-uf-anchor="company-industry-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              data-uf-anchor="company-website-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} id="save-company-btn" data-uf-anchor="save-company-btn">
          Save changes
        </Button>
      </div>
    </div>
  );
}
