import { User, Team, Session, Slot, SlotRequest } from '@/types';

export const mockUsers: User[] = [
  { id: 'admin-1', name: 'Dr. Sharma', email: 'admin@university.edu', role: 'admin' },
  { id: 'guide-1', name: 'Prof. Verma', email: 'verma@university.edu', role: 'guide' },
  { id: 'guide-2', name: 'Prof. Patel', email: 'patel@university.edu', role: 'guide' },
  { id: 'student-1', name: 'Rahul Kumar', email: 'rahul@student.edu', role: 'student', teamId: 'team-1' },
  { id: 'student-2', name: 'Priya Singh', email: 'priya@student.edu', role: 'student', teamId: 'team-1' },
  { id: 'student-3', name: 'Amit Joshi', email: 'amit@student.edu', role: 'student', teamId: 'team-2' },
  { id: 'student-4', name: 'Neha Gupta', email: 'neha@student.edu', role: 'student', teamId: 'team-2' },
  { id: 'student-5', name: 'Vikram Rao', email: 'vikram@student.edu', role: 'student', teamId: 'team-3' },
  { id: 'student-6', name: 'Ananya Das', email: 'ananya@student.edu', role: 'student', teamId: 'team-4' },
];

export const mockTeams: Team[] = [
  { id: 'team-1', name: 'Team Alpha', guideId: 'guide-1', studentIds: ['student-1', 'student-2'] },
  { id: 'team-2', name: 'Team Beta', guideId: 'guide-1', studentIds: ['student-3', 'student-4'] },
  { id: 'team-3', name: 'Team Gamma', guideId: 'guide-1', studentIds: ['student-5'] },
  { id: 'team-4', name: 'Team Delta', guideId: 'guide-2', studentIds: ['student-6'] },
];

export const mockSessions: Session[] = [
  { id: 'session-1', date: '2026-03-25', title: 'Mid-Term Review', slotsCount: 10 },
  { id: 'session-2', date: '2026-04-10', title: 'Final Review', slotsCount: 10 },
];

const timeSlots = [
  '09:00 – 09:20', '09:25 – 09:45', '09:50 – 10:10', '10:15 – 10:35', '10:40 – 11:00',
  '11:15 – 11:35', '11:40 – 12:00', '12:05 – 12:25', '14:00 – 14:20', '14:25 – 14:45',
];

export const mockSlots: Slot[] = timeSlots.map((time, i) => ({
  id: `slot-${i + 1}`,
  sessionId: 'session-1',
  slotIndex: i + 1,
  timeRange: time,
  status: i === 2 ? 'booked' : i === 5 ? 'pending' : 'available',
  bookedTeamId: i === 2 ? 'team-1' : undefined,
  bookedTeamName: i === 2 ? 'Team Alpha' : undefined,
  bookedStudentName: i === 2 ? 'Rahul Kumar' : undefined,
}));

export const mockRequests: SlotRequest[] = [
  {
    id: 'req-1', slotId: 'slot-3', slotIndex: 3, sessionId: 'session-1',
    studentId: 'student-1', studentName: 'Rahul Kumar',
    teamId: 'team-1', teamName: 'Team Alpha',
    status: 'approved', createdAt: '2026-03-24T10:00:00Z', timeRange: '09:50 – 10:10',
  },
  {
    id: 'req-2', slotId: 'slot-6', slotIndex: 6, sessionId: 'session-1',
    studentId: 'student-3', studentName: 'Amit Joshi',
    teamId: 'team-2', teamName: 'Team Beta',
    status: 'pending', createdAt: '2026-03-24T11:00:00Z', timeRange: '11:15 – 11:35',
  },
  {
    id: 'req-3', slotId: 'slot-6', slotIndex: 6, sessionId: 'session-1',
    studentId: 'student-5', studentName: 'Vikram Rao',
    teamId: 'team-3', teamName: 'Team Gamma',
    status: 'pending', createdAt: '2026-03-24T11:30:00Z', timeRange: '11:15 – 11:35',
  },
];