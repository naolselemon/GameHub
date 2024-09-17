import { SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button'; // Assuming this provides styles
import { Clapperboard } from 'lucide-react';
import Link from 'next/link'; // Ensure Link is imported from 'next/link'

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {user && (
        <div className="flex items-center gap-x-4 ">
          {/* Style the Link to look like a Button */}
          <Link
            href={`/u/${user.username}`}
            className="text-muted-foreground hover:text-primary flex items-center gap-2 px-4 py-2 border
             rounded-lg border-transparent transition"
          >
            <Clapperboard className="h-5 w-5" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </div>
  );
};
