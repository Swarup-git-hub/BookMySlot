import { SlotRequest } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Clock } from 'lucide-react';

interface RequestTableProps {
  requests: SlotRequest[];
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  showCancel?: boolean;
}

const statusBadge = {
  pending: <Badge variant="outline" className="border-warning/50 text-warning"><Clock className="h-3 w-3 mr-1" />Pending</Badge>,
  approved: <Badge variant="outline" className="border-success/50 text-success"><Check className="h-3 w-3 mr-1" />Approved</Badge>,
  rejected: <Badge variant="outline" className="border-destructive/50 text-destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>,
};

export default function RequestTable({ requests, showActions, onApprove, onReject, onCancel, showCancel }: RequestTableProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm">No requests found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Slot</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Student</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested</TableHead>
          {(showActions || showCancel) && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell className="font-mono text-sm">#{req.slotIndex}</TableCell>
            <TableCell className="text-sm">{req.timeRange}</TableCell>
            <TableCell className="font-medium text-sm">{req.studentName}</TableCell>
            <TableCell className="text-sm">{req.teamName}</TableCell>
            <TableCell>{statusBadge[req.status]}</TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {new Date(req.createdAt).toLocaleDateString()}
            </TableCell>
            {(showActions || showCancel) && (
              <TableCell>
                <div className="flex gap-2">
                  {showActions && req.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="h-7 text-xs border-success/50 text-success hover:bg-success hover:text-success-foreground" onClick={() => onApprove?.(req.id)}>
                        <Check className="h-3 w-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => onReject?.(req.id)}>
                        <X className="h-3 w-3 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                  {showCancel && req.status === 'pending' && (
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => onCancel?.(req.id)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}