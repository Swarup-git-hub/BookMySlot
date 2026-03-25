import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import RequestTable from '@/components/shared/RequestTable';
import SlotGrid from '@/components/shared/SlotGrid';
import { mockSlots, mockRequests, mockTeams } from '@/data/mock';
import { useAuth } from '@/context/AuthContext';
import { Users, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function GuideDashboard() {
  const { user } = useAuth();
  const guideTeams = mockTeams.filter(t => t.guideId === user?.id);
  const teamIds = guideTeams.map(t => t.id);

  const [requests, setRequests] = useState(mockRequests.filter(r => teamIds.includes(r.teamId)));
  const [slots, setSlots] = useState(mockSlots);

  const pending = requests.filter(r => r.status === 'pending').length;
  const approved = requests.filter(r => r.status === 'approved').length;

  const handleApprove = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (!req) return;

    // Check if team already has approved slot
    const teamApproved = requests.find(r => r.teamId === req.teamId && r.status === 'approved');
    if (teamApproved) {
      toast.error(`${req.teamName} already has an approved slot.`);
      return;
    }

    // Approve this, reject others for same slot
    setRequests(prev => prev.map(r => {
      if (r.id === id) return { ...r, status: 'approved' as const };
      if (r.slotId === req.slotId && r.status === 'pending') return { ...r, status: 'rejected' as const };
      return r;
    }));

    setSlots(prev => prev.map(s =>
      s.id === req.slotId
        ? { ...s, status: 'booked' as const, bookedTeamName: req.teamName, bookedStudentName: req.studentName, bookedTeamId: req.teamId }
        : s
    ));

    toast.success(`Approved slot #${req.slotIndex} for ${req.teamName}`);
  };

  const handleReject = (id: string) => {
    const req = requests.find(r => r.id === id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));

    // If no more pending requests for this slot, mark available
    const remainingPending = requests.filter(r => r.slotId === req?.slotId && r.id !== id && r.status === 'pending');
    if (remainingPending.length === 0 && req) {
      setSlots(prev => prev.map(s => s.id === req.slotId && s.status === 'pending' ? { ...s, status: 'available' as const } : s));
    }

    toast.success('Request rejected.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Guide Dashboard</h2>
          <p className="text-muted-foreground">Manage your teams' review slot bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="My Teams" value={guideTeams.length} icon={<Users className="h-5 w-5" />} />
          <StatCard title="Pending" value={pending} icon={<Clock className="h-5 w-5" />} />
          <StatCard title="Approved" value={approved} icon={<CheckCircle2 className="h-5 w-5" />} />
          <StatCard title="Total Slots" value={10} icon={<Calendar className="h-5 w-5" />} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Slot Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SlotGrid slots={slots} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <RequestTable
              requests={requests}
              showActions
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}