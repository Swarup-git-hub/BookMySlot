import DashboardLayout from '@/components/layout/DashboardLayout';
import SlotGrid from '@/components/shared/SlotGrid';
import { mockSlots } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slot } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function StudentSlots() {
  const { user } = useAuth();
  const [slots] = useState(mockSlots);

  const handleRequest = (slot: Slot) => {
    toast.success(`Requested slot #${slot.slotIndex} (${slot.timeRange})`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Book a Slot</h2>
          <p className="text-muted-foreground">Select an available slot to submit a request</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mid-Term Review — March 25, 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <SlotGrid slots={slots} onSlotClick={handleRequest} showRequestButton />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}