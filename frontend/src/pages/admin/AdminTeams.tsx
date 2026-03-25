import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockTeams, mockUsers } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function AdminTeams() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
          <p className="text-muted-foreground">All teams in the system</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Guide</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeams.map(team => {
                  const guide = mockUsers.find(u => u.id === team.guideId);
                  const students = mockUsers.filter(u => team.studentIds.includes(u.id));
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {team.name}
                      </TableCell>
                      <TableCell>{guide?.name || '—'}</TableCell>
                      <TableCell><Badge variant="secondary">{students.length}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {students.map(s => s.name).join(', ')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}