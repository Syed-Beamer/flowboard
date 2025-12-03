import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'About You' },
  { id: 2, name: 'Use Cases' },
  { id: 3, name: 'Configuration' },
  { id: 4, name: 'Confirmation' },
];

const useCases = [
  { id: 'onboarding', label: 'Onboarding new users' },
  { id: 'adoption', label: 'Product adoption' },
  { id: 'nps', label: 'NPS/Surveys' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'education', label: 'User education' },
  { id: 'support', label: 'Self-service support' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    teamSize: '',
    useCases: [] as string[],
    emailNotifications: true,
    weeklySummary: true,
  });
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    updateUser({
      onboardingCompleted: true,
      jobRole: formData.role as any,
      teamSize: formData.teamSize as any,
      emailNotifications: formData.emailNotifications,
      weeklySummary: formData.weeklySummary,
    });
    navigate('/app');
  };

  const toggleUseCase = (id: string) => {
    setFormData(prev => ({
      ...prev,
      useCases: prev.useCases.includes(id)
        ? prev.useCases.filter(uc => uc !== id)
        : [...prev.useCases, id],
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* TODO: Insert Userflow snippet here for onboarding */}
      
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-primary-foreground">F</span>
          </div>
          <span className="text-lg font-semibold">Flowboard</span>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Progress" data-uf-anchor="onboarding-progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex items-center gap-2',
                      step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                        step.id < currentStep
                          ? 'bg-primary text-primary-foreground'
                          : step.id === currentStep
                          ? 'border-2 border-primary text-primary'
                          : 'border-2 border-muted text-muted-foreground'
                      )}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </span>
                    <span className="hidden font-medium sm:inline">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'mx-4 h-0.5 w-16 sm:w-24',
                        step.id < currentStep ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-xl animate-fade-in">
          {/* Step 1: About You */}
          {currentStep === 1 && (
            <div className="space-y-8" data-uf-anchor="onboarding-step-1">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Tell us about you</h2>
                <p className="mt-2 text-muted-foreground">
                  Help us personalize your experience
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">What's your role?</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                    className="grid gap-3"
                    data-uf-anchor="onboarding-role"
                  >
                    {[
                      { value: 'product_manager', label: 'Product Manager' },
                      { value: 'engineer', label: 'Engineer' },
                      { value: 'designer', label: 'Designer' },
                      { value: 'other', label: 'Other' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Team size</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, teamSize: value }))}
                  >
                    <SelectTrigger className="w-full" data-uf-anchor="onboarding-team-size">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="1-5">1-5 people</SelectItem>
                      <SelectItem value="6-20">6-20 people</SelectItem>
                      <SelectItem value="21-100">21-100 people</SelectItem>
                      <SelectItem value="100+">100+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Use Cases */}
          {currentStep === 2 && (
            <div className="space-y-8" data-uf-anchor="onboarding-step-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">What do you want to use Flowboard for?</h2>
                <p className="mt-2 text-muted-foreground">
                  Select all that apply
                </p>
              </div>

              <div className="space-y-3" data-uf-anchor="onboarding-use-cases">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.id}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer',
                      formData.useCases.includes(useCase.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => toggleUseCase(useCase.id)}
                  >
                    <Checkbox
                      id={useCase.id}
                      checked={formData.useCases.includes(useCase.id)}
                      onCheckedChange={() => toggleUseCase(useCase.id)}
                    />
                    <Label htmlFor={useCase.id} className="flex-1 cursor-pointer font-normal">
                      {useCase.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Configuration */}
          {currentStep === 3 && (
            <div className="space-y-8" data-uf-anchor="onboarding-step-3">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Initial configuration</h2>
                <p className="mt-2 text-muted-foreground">
                  Set up your preferences
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, emailNotifications: checked }))
                    }
                    data-uf-anchor="onboarding-email-toggle"
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a digest of your team's activity
                    </p>
                  </div>
                  <Switch
                    checked={formData.weeklySummary}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, weeklySummary: checked }))
                    }
                    data-uf-anchor="onboarding-summary-toggle"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-8" data-uf-anchor="onboarding-step-4">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
                <p className="mt-2 text-muted-foreground">
                  Here's a summary of your setup
                </p>
              </div>

              <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium capitalize">{formData.role.replace('_', ' ') || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team size</span>
                  <span className="font-medium">{formData.teamSize || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Use cases</span>
                  <span className="font-medium">{formData.useCases.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email notifications</span>
                  <span className="font-medium">{formData.emailNotifications ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekly summary</span>
                  <span className="font-medium">{formData.weeklySummary ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              data-uf-anchor="onboarding-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} data-uf-anchor="onboarding-next">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                variant="gradient"
                id="complete-onboarding"
                data-uf-anchor="onboarding-complete"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
