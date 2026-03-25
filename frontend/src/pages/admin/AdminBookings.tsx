import DashboardLayout from '@/components/layout/DashboardLayout';
import RequestTable from '@/components/shared/RequestTable';
import { mockRequests } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminBookings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Bookings</h2>
          <p className="text-muted-foreground">Global view of all slot requests and bookings</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <RequestTable requests={mockRequests} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}