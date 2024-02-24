"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { decreaseAvailableCount } from "@/lib/org-limit";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  const isPro = await checkSubscription();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decreaseAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
