"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b shadow-sm transition-colors",
      isDashboard ? 'bg-primary text-primary-foreground' : 'bg-background'
    )}>
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-auto">
          <Link href={isAuthenticated ? "#" : "/login"} className="flex items-center gap-2 font-bold text-lg hover-lift cursor-pointer">
            <div className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <Wind className="h-6 w-6 text-primary" />
            </div>
            {/* Project name shown in the header */}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-semibold cursor-pointer">
              RoleVault
            </span>
            {/* Authentication status badge: shows whether authentication is completed or not */}
            {/* <Badge variant="outline" className="ml-3 text-xs py-1">
              {isLoading ? 'Checking Auth...' : isAuthenticated ? 'Authentication: Completed' : 'Authentication: Not completed'}
            </Badge> */}
          </Link>
        </div>

        {isDashboard && !isLoading && isAuthenticated && user && (
          <div className="flex items-center gap-2 text-sm sm:text-base mx-auto">
            <span className="hidden sm:inline font-medium">Welcome, {user.name}</span>
            <Badge
              variant={isDashboard ? 'secondary' : 'default'}
              className="capitalize hover:scale-105 transition-transform"
            >
              {user.role}
            </Badge>
          </div>
        )}

        <div className="flex items-center ml-auto">
          {isDashboard && !isLoading && isAuthenticated && (
            <Button variant="secondary" size="sm" onClick={useAuth().logout} className="hover-gradient">
              <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
