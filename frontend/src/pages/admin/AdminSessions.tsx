import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockSessions } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export default function AdminSessions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground">Manage review sessions</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Slots</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSessions.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {s.title}
                    </TableCell>
                    <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
                    <TableCell><Badge variant="secondary">{s.slotsCount} slots</Badge></TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-success/50 text-success">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}