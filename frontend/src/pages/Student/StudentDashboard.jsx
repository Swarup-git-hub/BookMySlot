// import React from "react";
// import {useEffect,useState} from "react";

// export default function Student(){
//   const [slots,setSlots]=useState([]);

//   useEffect(()=>{
//     fetch("http://localhost:5000/slot")
//       .then(r=>r.json())
//       .then(setSlots);
//   },[]);

//   return (
//     <div>
//       <h2>Slots</h2>
//       {slots.map(s=>(
//         <div key={s.id}>
//           {s.id} - {s.status}
//         </div>
//       ))}
//     </div>
//   );
// }


import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/shared/StatCard';
import SlotGrid from '@/components/shared/SlotGrid';
import RequestTable from '@/components/shared/RequestTable';
import { mockSlots, mockRequests } from '@/data/mock';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slot, SlotRequest } from '@/types';
import { toast } from 'sonner';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [slots, setSlots] = useState(mockSlots);
  const [requests, setRequests] = useState(mockRequests.filter(r => r.studentId === user?.id || r.teamId === user?.teamId));

  const myApproved = requests.filter(r => r.status === 'approved').length;
  const myPending = requests.filter(r => r.status === 'pending').length;
  const availableCount = slots.filter(s => s.status === 'available').length;

  const handleSlotRequest = (slot: Slot) => {
    // Check if team already has an approved slot
    if (myApproved > 0) {
      toast.error('Your team already has an approved slot for this session.');
      return;
    }

    const newRequest: SlotRequest = {
      id: `req-${Date.now()}`,
      slotId: slot.id,
      slotIndex: slot.slotIndex,
      sessionId: slot.sessionId,
      studentId: user!.id,
      studentName: user!.name,
      teamId: user!.teamId!,
      teamName: 'Team Alpha',
      status: 'pending',
      createdAt: new Date().toISOString(),
      timeRange: slot.timeRange,
    };

    setRequests(prev => [...prev, newRequest]);
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, status: 'pending' as const } : s));
    toast.success(`Slot #${slot.slotIndex} requested! Waiting for guide approval.`);
  };

  const handleCancel = (reqId: string) => {
    const req = requests.find(r => r.id === reqId);
    if (req) {
      setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'rejected' as const } : r));
      setSlots(prev => prev.map(s => s.id === req.slotId ? { ...s, status: 'available' as const } : s));
      toast.success('Request cancelled.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, {user?.name}</h2>
          <p className="text-muted-foreground">Mid-Term Review — March 25, 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Available Slots" value={availableCount} icon={<Calendar className="h-5 w-5" />} description="Open for booking" />
          <StatCard title="Pending Requests" value={myPending} icon={<Clock className="h-5 w-5" />} description="Awaiting approval" />
          <StatCard title="Approved" value={myApproved} icon={<CheckCircle2 className="h-5 w-5" />} description="Confirmed slots" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Slot Grid — Select a Slot</CardTitle>
          </CardHeader>
          <CardContent>
            <SlotGrid slots={slots} onSlotClick={handleSlotRequest} showRequestButton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <RequestTable requests={requests} showCancel onCancel={handleCancel} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}