import { Slot } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlotGridProps {
  slots: Slot[];
  onSlotClick?: (slot: Slot) => void;
  showRequestButton?: boolean;
}

const statusConfig = {
  available: { label: 'Available', className: 'border-success/30 bg-success/5 hover:border-success/60', dotClass: 'bg-success' },
  booked: { label: 'Booked', className: 'border-primary/30 bg-primary/5', dotClass: 'bg-primary' },
  pending: { label: 'Pending', className: 'border-warning/30 bg-warning/5', dotClass: 'bg-warning' },
  rejected: { label: 'Rejected', className: 'border-destructive/30 bg-destructive/5', dotClass: 'bg-destructive' },
};

export default function SlotGrid({ slots, onSlotClick, showRequestButton }: SlotGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {slots.map((slot) => {
        const config = statusConfig[slot.status];
        const isClickable = slot.status === 'available' && showRequestButton;

        return (
          <div
            key={slot.id}
            className={cn(
              'relative rounded-xl border-2 p-4 transition-all duration-200',
              config.className,
              isClickable && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'
            )}
            onClick={() => isClickable && onSlotClick?.(slot)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">
                #{slot.slotIndex}
              </span>
              <span className={cn('h-2.5 w-2.5 rounded-full', config.dotClass)} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <Clock className="h-3 w-3" />
              {slot.timeRange}
            </div>

            <p className="text-xs font-semibold capitalize mb-1">{config.label}</p>

            {slot.bookedTeamName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <User className="h-3 w-3" />
                <span className="truncate">{slot.bookedTeamName}</span>
              </div>
            )}

            {isClickable && (
              <Button size="sm" className="w-full mt-3 h-7 text-xs">
                Request
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
