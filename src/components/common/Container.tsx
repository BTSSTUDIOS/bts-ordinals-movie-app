import { cn } from '@/lib/utils';

export function Container ({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('max-w-[--global-max-width] h-full', className)}>
      {children}
    </div>
  );
};