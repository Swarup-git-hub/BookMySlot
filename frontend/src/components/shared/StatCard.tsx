import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
}

export default function StatCard({ title, value, icon, description, className }: StatCardProps) {
  return (
    <div className={cn('bg-card rounded-xl border p-5 transition-shadow hover:shadow-md', className)}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}