import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const settingsNav = [
  { name: 'Profile', href: '/app/settings/profile' },
  { name: 'Team', href: '/app/settings/team' },
  { name: 'Company', href: '/app/settings/company' },
  { name: 'Billing', href: '/app/settings/billing' },
  { name: 'Security', href: '/app/settings/security' },
  { name: 'API', href: '/app/settings/api' },
  { name: 'Integrations', href: '/app/settings/integrations' },
];

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="p-6 animate-fade-in" data-uf-anchor="settings-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and workspace preferences</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Navigation */}
        <nav className="w-full lg:w-56 shrink-0" data-uf-anchor="settings-nav">
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {settingsNav.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === '/app/settings/profile' && location.pathname === '/app/settings');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  data-uf-anchor={`settings-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
