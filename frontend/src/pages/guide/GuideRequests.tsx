import DashboardLayout from '@/components/layout/DashboardLayout';
import RequestTable from '@/components/shared/RequestTable';
import { mockRequests } from '@/data/mock';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GuideRequests() {
  const [requests, setRequests] = useState(mockRequests);

  const handleApprove = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (!req) return;
    setRequests(prev => prev.map(r => {
      if (r.id === id) return { ...r, status: 'approved' as const };
      if (r.slotId === req.slotId && r.status === 'pending') return { ...r, status: 'rejected' as const };
      return r;
    }));
    toast.success(`Approved slot #${req.slotIndex} for ${req.teamName}`);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    toast.success('Request rejected.');
  };

  const pending = requests.filter(r => r.status === 'pending');
  const approved = requests.filter(r => r.status === 'approved');
  const rejected = requests.filter(r => r.status === 'rejected');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Requests</h2>
          <p className="text-muted-foreground">Review and manage slot requests from your teams</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-4">
                <RequestTable requests={pending} showActions onApprove={handleApprove} onReject={handleReject} />
              </TabsContent>
              <TabsContent value="approved" className="mt-4">
                <RequestTable requests={approved} />
              </TabsContent>
              <TabsContent value="rejected" className="mt-4">
                <RequestTable requests={rejected} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}