'use server';

import { blockUser, UnblockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (id: string) => {
  // TODO: adapt to disconnect from livestreams
  // TODO: allow ability to kick the guest
  const blockedUser = await blockUser(id);

  revalidatePath('/');

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const UnblockedUser = await UnblockUser(id);

  revalidatePath('/');

  if (UnblockedUser) {
    revalidatePath(`/${UnblockedUser.blocked.username}`);
  }

  return UnblockedUser;
};
