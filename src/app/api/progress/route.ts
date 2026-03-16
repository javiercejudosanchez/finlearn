import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const prisma = getPrisma();
  const { userId, lessonId, xpEarned, mistakes } = await req.json();

  if (!userId || !lessonId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const total = (xpEarned ?? 0) + (mistakes ?? 0);
  const score = total > 0 ? Math.round(((xpEarned ?? 0) / total) * 100) / 100 : 0;

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, score },
    create: { userId, lessonId, completed: true, score },
  });

  // Update user XP with the actual XP earned
  if ((xpEarned ?? 0) > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: xpEarned } },
    });
  }

  return NextResponse.json(progress);
}
