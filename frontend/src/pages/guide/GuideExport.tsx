import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockRequests, mockSlots } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSpreadsheet, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function GuideExport() {
  const handleExport = () => {
    const approvedRequests = mockRequests.filter(r => r.status === 'approved');
    const rows = [
      ['Slot #', 'Time Range', 'Student', 'Team', 'Status', 'Date'],
      ...mockSlots.map(slot => {
        const req = approvedRequests.find(r => r.slotId === slot.id);
        return [
          `#${slot.slotIndex}`,
          slot.timeRange,
          req?.studentName || '—',
          req?.teamName || '—',
          slot.status,
          req ? new Date(req.createdAt).toLocaleDateString() : '—',
        ];
      }),
    ];

    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slot-bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Export downloaded!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Export Data</h2>
          <p className="text-muted-foreground">Download booking data in spreadsheet format</p>
        </div>

        <Card className="max-w-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Slot Bookings Report</CardTitle>
                <CardDescription>All slots with booking details for current session</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} className="w-full">
              <Download className="h-4 w-4 mr-2" /> Export as CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
