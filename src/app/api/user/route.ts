import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      xp: true,
      streak: true,
      lives: true,
      level: true,
      lastActiveAt: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const lessonsCompleted = await prisma.userProgress.count({
    where: { userId, completed: true },
  });

  return NextResponse.json({ ...user, lessonsCompleted });
}

export async function PATCH(req: NextRequest) {
  const prisma = getPrisma();
  const { userId, name, avatarUrl, lives, password } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (name !== undefined) updateData.name = name;
  if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
  if (typeof lives === "number") updateData.lives = Math.max(0, Math.min(5, lives));

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, name: true, avatarUrl: true, xp: true, streak: true, level: true },
  });

  // Password change is handled via Supabase Auth — not Prisma
  void password;

  return NextResponse.json(user);
}
