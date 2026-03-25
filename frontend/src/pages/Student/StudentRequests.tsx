import DashboardLayout from '@/components/layout/DashboardLayout';
import RequestTable from '@/components/shared/RequestTable';
import { mockRequests } from '@/data/mock';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

export default function StudentRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(mockRequests);

  const handleCancel = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    toast.success('Request cancelled.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Requests</h2>
          <p className="text-muted-foreground">Track the status of your slot requests</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <RequestTable requests={requests} showCancel onCancel={handleCancel} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}