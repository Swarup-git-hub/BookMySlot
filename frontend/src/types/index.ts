export type UserRole = 'admin' | 'guide' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  guideId: string;
  studentIds: string[];
}

export interface Session {
  id: string;
  date: string;
  title: string;
  slotsCount: number;
}

export type SlotStatus = 'available' | 'pending' | 'booked' | 'rejected';

export interface Slot {
  id: string;
  sessionId: string;
  slotIndex: number;
  timeRange: string;
  status: SlotStatus;
  bookedTeamId?: string;
  bookedTeamName?: string;
  bookedStudentName?: string;
}

export interface SlotRequest {
  id: string;
  slotId: string;
  slotIndex: number;
  sessionId: string;
  studentId: string;
  studentName: string;
  teamId: string;
  teamName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  timeRange: string;
}