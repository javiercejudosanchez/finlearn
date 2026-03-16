import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 20,
    select: { id: true, name: true, avatar: true, xp: true },
  });
  return NextResponse.json(users);
}
