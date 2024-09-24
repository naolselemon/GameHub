'use server';

import { stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

import { getSelf } from '@/lib/auth-service';

export const updateStream = async (values: Partial<stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUniqueStream({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error('User does not have a stream');
    }

    const validate = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: { ...validate },
    });

    revalidatePath(`/u/${self.username}/caht`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error('Internal Error');
  }
};
