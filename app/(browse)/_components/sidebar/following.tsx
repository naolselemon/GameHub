'use client';

import { Follow, User } from '@prisma/client';

import { useSidebar } from '@/store/user-sidebar';
import { UserItem, UserItemSkeleton } from './user-items';

interface FollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }) => {
  const { collapsed } = useSidebar((state) => state);
  if (!data.length) {
    return null;
  }
  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul>
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
