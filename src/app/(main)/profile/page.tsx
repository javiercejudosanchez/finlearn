"use client";

import { useGameStore } from "@/stores/gameStore";
import { LevelProgress } from "@/components/gamification/LevelProgress";

export default function ProfilePage() {
  const { xp, streak, hearts } = useGameStore();

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
          🐻
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">Tu Perfil</h1>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-amber-50 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{xp}</p>
          <p className="text-sm text-gray-500">XP total</p>
        </div>
        <div className="rounded-xl bg-orange-50 p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{streak}</p>
          <p className="text-sm text-gray-500">Racha</p>
        </div>
        <div className="rounded-xl bg-red-50 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{hearts}</p>
          <p className="text-sm text-gray-500">Vidas</p>
        </div>
      </div>

      <div className="mt-6">
        <LevelProgress />
      </div>
    </div>
  );
}
