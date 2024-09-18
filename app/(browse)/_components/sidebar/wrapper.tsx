'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/user-sidebar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full  border-r bg-[#252731] border-[#2D2E35] z-50',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
