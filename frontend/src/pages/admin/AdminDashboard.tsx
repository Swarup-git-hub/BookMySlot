import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import SlotGrid from '@/components/shared/SlotGrid';
import { mockSlots, mockRequests, mockTeams, mockUsers, mockSessions } from '@/data/mock';
import { Users, UserCog, Calendar, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalGuides = mockUsers.filter(u => u.role === 'guide').length;
  const pending = mockRequests.filter(r => r.status === 'pending').length;
  const approved = mockRequests.filter(r => r.status === 'approved').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Teams" value={mockTeams.length} icon={<Users className="h-5 w-5" />} />
          <StatCard title="Students" value={totalStudents} icon={<UserCog className="h-5 w-5" />} />
          <StatCard title="Guides" value={totalGuides} icon={<BookOpen className="h-5 w-5" />} />
          <StatCard title="Sessions" value={mockSessions.length} icon={<Calendar className="h-5 w-5" />} />
          <StatCard title="Pending" value={pending} icon={<Clock className="h-5 w-5" />} />
          <StatCard title="Approved" value={approved} icon={<CheckCircle2 className="h-5 w-5" />} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Session — Slot Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SlotGrid slots={mockSlots} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}