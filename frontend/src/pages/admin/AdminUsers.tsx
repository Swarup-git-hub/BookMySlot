import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockUsers } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/types';

const roleBadgeClass = {
  admin: 'bg-destructive/10 text-destructive border-destructive/20',
  guide: 'bg-primary/10 text-primary border-primary/20',
  student: 'bg-success/10 text-success border-success/20',
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User removed.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">Manage all system users</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={roleBadgeClass[u.role]}>{u.role}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{u.teamId || '—'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(u.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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