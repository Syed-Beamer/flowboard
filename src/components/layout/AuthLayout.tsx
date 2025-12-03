import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* TODO: Insert Userflow snippet here for auth pages */}
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between gradient-primary p-12">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
              <span className="text-xl font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">Flowboard</span>
          </Link>
        </div>
        
        <div className="space-y-6">
          <blockquote className="text-xl font-medium leading-relaxed text-primary-foreground/90">
            "Flowboard has transformed how our product team collaborates. We shipped 3x faster after adopting it."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary-foreground/20" />
            <div>
              <p className="font-semibold text-primary-foreground">Sarah Chen</p>
              <p className="text-sm text-primary-foreground/70">VP of Product, TechCorp</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2024 Flowboard. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
