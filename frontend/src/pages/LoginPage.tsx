import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: typeof GraduationCap; desc: string }[] = [
  { value: 'student', label: 'Student', icon: GraduationCap, desc: 'Request review slots' },
  { value: 'guide', label: 'Guide', icon: BookOpen, desc: 'Manage team bookings' },
  { value: 'admin', label: 'Admin', icon: Shield, desc: 'System administration' },
];

const demoAccounts: Record<UserRole, string> = {
  student: 'rahul@student.edu',
  guide: 'verma@university.edu',
  admin: 'admin@university.edu',
};

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState(demoAccounts.student);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(demoAccounts[role]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, selectedRole);
    if (success) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">SlotBook</h1>
          <p className="text-muted-foreground mt-2">Review Slot Booking System</p>
        </div>

        <Card className="border-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {roles.map(({ value, label, icon: Icon, desc }) => (
                <button
                  key={value}
                  onClick={() => handleRoleChange(value)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center',
                    selectedRole === value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-semibold">{label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{desc}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" defaultValue="demo123" placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full">
                Sign In as {roles.find(r => r.value === selectedRole)?.label}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Demo mode — any credentials will work
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}