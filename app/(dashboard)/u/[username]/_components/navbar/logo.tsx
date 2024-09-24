import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <Image
          src="/logo.jpeg"
          alt="GameHub"
          height="45"
          width="45"
          className="rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink"
        />
        <div className={cn(font.className, 'hidden lg:block ')}>
          <p className="text-lg font-semibold">GameHub</p>
          <p className="text-xs text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
};
