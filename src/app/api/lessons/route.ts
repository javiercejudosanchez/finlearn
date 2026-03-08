import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  const lessons = await prisma.lesson.findMany({
    include: {
      exercises: {
        include: { options: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(lessons);
}
