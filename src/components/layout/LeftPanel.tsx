"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { useStatsStore } from "@/stores/statsStore";
import { getSupabase } from "@/lib/supabase";
import { Tiger } from "@/components/mascot/Tiger";

export function LeftPanel() {
  const { hearts, streak, globalMistakeCount, xp } = useGameStore();
  const stats = useStatsStore();
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>("🐯");
  const [memberDays, setMemberDays] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/user?userId=${session.user.id}`);
        if (res.ok) {
          const u = await res.json();
          setUserName(u.name ?? u.email?.split("@")[0] ?? "Usuario");
          if (u.avatarUrl) setUserAvatar(u.avatarUrl);
          if (u.createdAt) {
            const days = Math.floor((Date.now() - new Date(u.createdAt).getTime()) / 86400000);
            setMemberDays(Math.max(1, days));
          }
        }
      } catch { /* ignore */ }
    }
    load();
  }, []);

  const mistakePct = Math.round((globalMistakeCount / 70) * 100);
  const accuracy = stats.questionsAnswered > 0
    ? Math.round((stats.questionsCorrect / stats.questionsAnswered) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* User card */}
      <Link href="/profile" className="block rounded-2xl bg-white p-4 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl shrink-0">
            {userAvatar}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-800 truncate">{userName ?? "Usuario"}</p>
            <p className="text-xs text-gray-500">{xp} XP</p>
          </div>
        </div>

        {/* Streak */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2">
          <span className="text-xl">🔥</span>
          <div>
            <p className="text-sm font-bold text-orange-600">{streak} días de racha</p>
            <p className="text-xs text-gray-400">{streak === 0 ? "¡Empieza hoy!" : "¡Sigue así!"}</p>
          </div>
        </div>

        {/* Lives */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">Vidas</span>
            <span className="text-xs text-gray-400">Fallos: {globalMistakeCount}/70</span>
          </div>
          <div className="flex gap-1 mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-lg">{i < hearts ? "❤️" : "🤍"}</span>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <motion.div className="h-full rounded-full bg-red-400" animate={{ width: `${mistakePct}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      </Link>

      {/* Tiger */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <Tiger mood="home" size="large" />
      </div>

      {/* Stats */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 text-sm font-bold text-gray-800 flex items-center gap-2">
          📊 <span>Mis estadísticas</span>
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1.5">✅ Tests completados</span>
            <span className="font-bold text-gray-700">{stats.testsCompleted}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1.5">❓ Preguntas acertadas</span>
            <span className="font-bold text-gray-700">{stats.questionsCorrect}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1.5">🎯 Porcentaje de acierto</span>
            <span className={`font-bold ${accuracy >= 80 ? "text-emerald-600" : accuracy >= 60 ? "text-amber-600" : "text-gray-700"}`}>
              {accuracy}%
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1.5">⚡ Mejor racha</span>
            <span className="font-bold text-gray-700">{stats.bestAnswerStreak} seguidas</span>
          </div>
          {memberDays !== null && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">📅 Tiempo como usuario</span>
              <span className="font-bold text-gray-700">{memberDays} día{memberDays !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
