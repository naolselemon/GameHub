'use client';

import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handlefollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`Your are now following ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`Your have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handlefollow();
    }
  };

  return (
    <Button
      disabled={isFollowing || isPending}
      onClick={onClick}
      variant="primary"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
