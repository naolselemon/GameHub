import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export const isBlockingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockerId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error('Cannot block yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error('Already blocked');
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const UnblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error('Cannot Unblock yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error('Not blocked');
  }
  const Unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return Unblock;
};
