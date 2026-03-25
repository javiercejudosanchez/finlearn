"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { useMissionsStore } from "@/stores/missionsStore";
import { getSupabase } from "@/lib/supabase";
import { getLevelInfo } from "@/utils/xp";

const DAILY_FACTS = [
  "Warren Buffett compró su primera acción a los 11 años por 38 dólares.",
  "El billete más grande jamás impreso fue de 100 billones de dólares en Zimbabue en 2008.",
  "El 80% de los millonarios en EE.UU. son primera generación, no heredaron su riqueza.",
  "Si inviertes 200€/mes desde los 25 años al 7% anual, tendrás más de 500.000€ a los 65.",
  "El mercado de valores de EE.UU. ha subido un promedio del 10% anual durante 100 años.",
  "Amazon perdió dinero durante sus primeros 9 años, pero Jeff Bezos siguió invirtiendo.",
  "El interés compuesto fue llamado por Einstein 'la octava maravilla del mundo'.",
  "El 1% más rico del mundo posee más riqueza que el 99% restante combinado.",
  "La inflación promedio histórica en España es del 3% anual. Tu dinero en el banco pierde valor.",
  "Un fondo indexado al S&P 500 supera al 90% de los fondos gestionados activamente.",
  "La regla del 72: divide 72 entre tu tasa de interés para saber cuándo se duplica tu dinero.",
  "Noruega tiene el mayor fondo soberano del mundo con más de 1,3 billones de dólares.",
  "Bitcoin llegó a valer casi 0 en 2010. Un programador vendió 10.000 BTC por dos pizzas.",
  "El primer banco central del mundo fue el Riksbank de Suecia, fundado en 1668.",
  "Los precios de la vivienda en España han subido un 1.500% en los últimos 40 años.",
  "Una acción de Berkshire Hathaway (Buffett) vale más de 600.000 dólares.",
  "La deuda pública global supera los 300 billones de dólares, el 340% del PIB mundial.",
  "Apple fue a la quiebra técnica en 1997. Steve Jobs la salvó con 150 millones de Microsoft.",
  "El 70% de los españoles no tiene ningún plan de pensiones privado.",
  "Ahorrar el 1% más de tu salario durante 30 años puede equivaler a 5 años de salario extra.",
];

function getDailyFact(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_FACTS[dayOfYear % DAILY_FACTS.length];
}

const MOCK_USERS = [
  { id: "mock_1", name: "FinExpert",    avatarUrl: "🦊", xp: 480 },
  { id: "mock_2", name: "InversorPro",  avatarUrl: "🐻", xp: 350 },
  { id: "mock_3", name: "AhorradorTop", avatarUrl: "🐼", xp: 230 },
  { id: "mock_4", name: "Economista99", avatarUrl: "🦁", xp: 120 },
];

type RankEntry = { id: string; name: string | null; avatarUrl: string | null; xp: number; isUser?: boolean };

function buildRanking(apiData: RankEntry[], userId: string | null, userXP: number, userName: string | null): RankEntry[] {
  const realUsers = apiData.filter((u) => !u.id.startsWith("mock_"));
  const currentUser: RankEntry = {
    id: userId ?? "current",
    name: userName ?? "Tú",
    avatarUrl: "🐯",
    xp: userXP,
    isUser: true,
  };

  const allEntries: RankEntry[] = [];
  // Add real users (excluding current user if already present)
  realUsers.forEach((u) => {
    if (u.id !== userId) allEntries.push(u);
  });
  // Add mock users not already present
  MOCK_USERS.forEach((m) => {
    if (!allEntries.find((e) => e.id === m.id)) allEntries.push(m);
  });
  // Add current user
  allEntries.push(currentUser);
  // Sort by XP descending, take top 5
  return allEntries.sort((a, b) => b.xp - a.xp).slice(0, 5);
}

const MISSIONS = [
  { id: "tests_10",  label: "Completa 10 tests esta semana", goal: 10,  unit: "tests",  bonus: 50 },
  { id: "xp_100",   label: "Consigue 100 puntos esta semana", goal: 100, unit: "pts",    bonus: 50 },
  { id: "days_5",   label: "Estudia 5 días esta semana",      goal: 5,   unit: "días",   bonus: 50 },
  { id: "perfect",  label: "Completa un test con 10/10",      goal: 1,   unit: "test",   bonus: 50 },
];

export function RightPanel() {
  const { xp, addXP } = useGameStore();
  const { level, progress } = getLevelInfo(xp);
  const missions = useMissionsStore();
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [rankingLoaded, setRankingLoaded] = useState(false);
  const dailyFact = getDailyFact();

  useEffect(() => {
    missions.checkReset();
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      let apiData: RankEntry[] = [];
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) apiData = await res.json();
      } catch { /* ignore */ }
      // Try to get user name
      if (uid) {
        try {
          const res = await fetch(`/api/user?userId=${uid}`);
          if (res.ok) { const u = await res.json(); setUserName(u.name ?? u.email?.split("@")[0] ?? null); }
        } catch { /* ignore */ }
      }
      setRanking(buildRanking(apiData, uid, xp, null));
      setRankingLoaded(true);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sort ranking when XP changes
  useEffect(() => {
    if (rankingLoaded) {
      setRanking((prev) => buildRanking(prev.filter((u) => !u.isUser), userId, xp, userName));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);

  const dailyGoal = 2;
  const testsToday = missions.testsToday;
  const goalPct = Math.min(100, (testsToday / dailyGoal) * 100);

  function getMissionProgress(id: string): number {
    switch (id) {
      case "tests_10": return missions.testsThisWeek;
      case "xp_100":   return missions.xpThisWeek;
      case "days_5":   return missions.daysThisWeek.length;
      case "perfect":  return missions.hasPerfectTest ? 1 : 0;
      default: return 0;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mini leaderboard */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">🏆 <span>Ranking</span></h3>
        {!rankingLoaded ? (
          <p className="text-xs text-gray-400 text-center py-2">Cargando...</p>
        ) : (
          <div className="space-y-2">
            {ranking.map((u, i) => (
              <div
                key={u.id}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  u.isUser ? "bg-orange-50 font-bold ring-1 ring-orange-200" : "bg-gray-50"
                }`}
              >
                <span className="w-5 text-center font-bold text-gray-400 text-xs">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </span>
                <span className="text-base">{u.avatarUrl || "🐻"}</span>
                <span className="flex-1 truncate text-gray-700">
                  {u.name ?? "Usuario"}{u.isUser ? " (tú)" : ""}
                </span>
                <span className="font-bold text-amber-500 text-xs">{u.xp} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Level progress */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">⭐ <span>Nivel {level}</span></h3>
        <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
          <motion.div className="h-full rounded-full bg-orange-400" animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
        </div>
        <p className="mt-1 text-right text-xs text-gray-400">{Math.round(progress)}% al nivel {level + 1}</p>
      </div>

      {/* Daily goal */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">🎯 <span>Objetivo diario</span></h3>
        <p className="text-sm text-gray-500 mb-2">Completa {dailyGoal} tests hoy</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
            <motion.div className="h-full rounded-full bg-emerald-500" animate={{ width: `${goalPct}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span className={`text-sm font-bold ${testsToday >= dailyGoal ? "text-emerald-500" : "text-gray-400"}`}>
            {testsToday >= dailyGoal ? "✓" : `${testsToday}/${dailyGoal}`}
          </span>
        </div>
      </div>

      {/* Weekly missions */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">📋 <span>Misiones semanales</span></h3>
        <div className="space-y-3">
          {MISSIONS.map((m) => {
            const prog = getMissionProgress(m.id);
            const done = prog >= m.goal;
            const claimed = missions.claimedBonuses.includes(m.id);
            const pct = Math.min(100, (prog / m.goal) * 100);
            return (
              <div key={m.id} className={`rounded-xl p-3 ${done ? "bg-emerald-50" : "bg-gray-50"}`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className={`text-xs font-medium leading-tight ${done ? "text-emerald-700" : "text-gray-600"}`}>
                    {done ? "✅" : "⬜"} {m.label}
                  </p>
                  {done && !claimed && (
                    <button
                      onClick={() => { missions.claimBonus(m.id); addXP(m.bonus); }}
                      className="shrink-0 rounded-lg bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-600"
                    >
                      +{m.bonus} pts
                    </button>
                  )}
                  {claimed && <span className="shrink-0 text-[10px] font-bold text-emerald-500">✓ Reclamado</span>}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {m.id === "perfect" ? (done ? "1/1" : "0/1") : `${Math.min(prog, m.goal)}/${m.goal} ${m.unit}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily financial fact */}
      <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 p-4 shadow-sm text-white">
        <h3 className="mb-2 font-bold flex items-center gap-2 text-sm">💡 Dato financiero del día</h3>
        <p className="text-sm leading-relaxed opacity-90">{dailyFact}</p>
      </div>
    </div>
  );
}
