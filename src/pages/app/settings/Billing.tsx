import { useState } from 'react';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'For individuals getting started',
    features: ['Up to 3 projects', '5 team members', 'Basic analytics', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    description: 'For growing teams',
    features: ['Unlimited projects', 'Unlimited team members', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: ['Everything in Pro', 'SSO/SAML', 'Dedicated support', 'Custom contracts', 'SLA guarantees', 'Advanced security'],
  },
];

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Japan',
];

export default function Billing() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.plan || 'pro');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('United States');

  const trialDaysLeft = user?.trialEndAt
    ? Math.max(0, Math.ceil((new Date(user.trialEndAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleUpgrade = () => {
    updateUser({ plan: selectedPlan as any });
    toast({
      title: 'Plan updated',
      description: `You are now on the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.`,
    });
  };

  return (
    <div className="space-y-6" data-uf-anchor="billing-settings">
      {/* Trial Banner */}
      {trialDaysLeft > 0 && (
        <div className="flex items-center gap-3 rounded-lg bg-warning/10 border border-warning/20 px-4 py-3" data-uf-anchor="trial-end-banner">
          <AlertCircle className="h-5 w-5 text-warning" />
          <p className="text-sm">
            <span className="font-medium">Your trial ends on {user?.trialEndAt ? new Date(user.trialEndAt).toLocaleDateString() : 'soon'}.</span>{' '}
            Upgrade to keep all your features.
          </p>
        </div>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {user?.plan?.toUpperCase() || 'PRO'} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{plans.find(p => p.id === user?.plan)?.price || '$29'}/month</p>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>
            <Button variant="outline" data-uf-anchor="manage-subscription-btn">
              Manage subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose a Plan</CardTitle>
          <CardDescription>Select the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4 md:grid-cols-3" data-uf-anchor="plan-selection">
            {plans.map((plan) => (
              <div key={plan.id} className="relative">
                <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
                <Label
                  htmlFor={plan.id}
                  className={cn(
                    'flex flex-col h-full rounded-lg border-2 p-4 cursor-pointer transition-colors',
                    'hover:border-primary/50',
                    selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                  )}
                  data-uf-anchor={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <p className="text-2xl font-bold mb-4">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card data-uf-anchor="billing-form">
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Enter your payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholder">Cardholder name</Label>
            <Input
              id="cardholder"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              data-uf-anchor="billing-cardholder-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardnumber">Card number</Label>
            <Input
              id="cardnumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              data-uf-anchor="billing-cardnumber-input"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                data-uf-anchor="billing-expiry-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                data-uf-anchor="billing-cvc-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger data-uf-anchor="billing-country-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" className="text-destructive" data-uf-anchor="cancel-subscription-btn">
          Cancel subscription
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" data-uf-anchor="downgrade-btn">
            Downgrade to Free
          </Button>
          <Button onClick={handleUpgrade} id="billing-upgrade-btn" data-uf-anchor="billing-upgrade-btn">
            Upgrade to {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
          </Button>
        </div>
      </div>
    </div>
  );
}
