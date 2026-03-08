import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const prisma = getPrisma();
  const { userId, lessonId, score } = await req.json();

  if (!userId || !lessonId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, score },
    create: { userId, lessonId, completed: true, score },
  });

  // Update user XP
  await prisma.user.update({
    where: { id: userId },
    data: { xp: { increment: score * 10 } },
  });

  return NextResponse.json(progress);
}
