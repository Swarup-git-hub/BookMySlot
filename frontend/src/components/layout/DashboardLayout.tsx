import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Calendar, Users, Settings, LogOut,
  ClipboardList, FileSpreadsheet, UserCog, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navByRole: Record<string, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/student', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Book Slot', path: '/student/slots', icon: <Calendar className="h-5 w-5" /> },
    { label: 'My Requests', path: '/student/requests', icon: <ClipboardList className="h-5 w-5" /> },
  ],
  guide: [
    { label: 'Dashboard', path: '/guide', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Requests', path: '/guide/requests', icon: <ClipboardList className="h-5 w-5" /> },
    { label: 'Teams', path: '/guide/teams', icon: <Users className="h-5 w-5" /> },
    { label: 'Export', path: '/guide/export', icon: <FileSpreadsheet className="h-5 w-5" /> },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Users', path: '/admin/users', icon: <UserCog className="h-5 w-5" /> },
    { label: 'Teams', path: '/admin/teams', icon: <Users className="h-5 w-5" /> },
    { label: 'Sessions', path: '/admin/sessions', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Bookings', path: '/admin/bookings', icon: <Calendar className="h-5 w-5" /> },
  ],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navItems = navByRole[user.role] || [];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">
            SlotBook
          </h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1 capitalize">{user.role} Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => { logout(); navigate('/login'); }}
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}