import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockTeams, mockUsers } from '@/data/mock';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function GuideTeams() {
  const { user } = useAuth();
  const guideTeams = mockTeams.filter(t => t.guideId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Teams</h2>
          <p className="text-muted-foreground">View and manage your assigned teams</p>
        </div>

        <div className="grid gap-4">
          {guideTeams.map(team => {
            const students = mockUsers.filter(u => team.studentIds.includes(u.id));
            return (
              <Card key={team.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      {team.name}
                    </CardTitle>
                    <Badge variant="secondary">{students.length} members</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(s => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell className="text-muted-foreground">{s.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}
          {guideTeams.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No teams assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}