"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
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

type RankEntry = { id: string; name: string | null; avatarUrl: string | null; xp: number; isUser?: boolean };

export function RightPanel() {
  const { xp } = useGameStore();
  const { level, progress } = getLevelInfo(xp);
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [testsToday, setTestsToday] = useState(0);
  const dailyFact = getDailyFact();

  useEffect(() => {
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      setUserId(session?.user?.id ?? null);
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data: RankEntry[] = await res.json();
          setRanking(data.slice(0, 5).map((u) => ({ ...u, isUser: u.id === session?.user?.id })));
        }
      } catch { /* ignore */ }
    }
    load();
  }, []);

  const dailyGoal = 2;
  const goalPct = Math.min(100, (testsToday / dailyGoal) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Mini leaderboard */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">
          🏆 <span>Ranking</span>
        </h3>
        {ranking.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">Cargando...</p>
        ) : (
          <div className="space-y-2">
            {ranking.map((u, i) => (
              <div
                key={u.id}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  u.isUser ? "bg-orange-50 font-bold" : "bg-gray-50"
                }`}
              >
                <span className="w-5 text-center font-bold text-gray-400 text-xs">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </span>
                <span className="text-base">{u.avatarUrl || "🐻"}</span>
                <span className="flex-1 truncate text-gray-700">{u.name ?? "Usuario"}{u.isUser ? " (tú)" : ""}</span>
                <span className="font-bold text-amber-500 text-xs">{u.xp} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Level progress */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">
          ⭐ <span>Nivel {level}</span>
        </h3>
        <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-orange-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-gray-400">{Math.round(progress)}% al nivel {level + 1}</p>
      </div>

      {/* Daily goal */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <h3 className="mb-3 font-bold text-gray-800 flex items-center gap-2">
          🎯 <span>Objetivo diario</span>
        </h3>
        <p className="text-sm text-gray-500 mb-2">Completa {dailyGoal} tests hoy</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{ width: `${goalPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className={`text-sm font-bold ${testsToday >= dailyGoal ? "text-emerald-500" : "text-gray-400"}`}>
            {testsToday >= dailyGoal ? "✓" : `${testsToday}/${dailyGoal}`}
          </span>
        </div>
      </div>

      {/* Daily financial fact */}
      <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 p-4 shadow-sm text-white">
        <h3 className="mb-2 font-bold flex items-center gap-2 text-sm">
          💡 Dato financiero del día
        </h3>
        <p className="text-sm leading-relaxed opacity-90">{dailyFact}</p>
      </div>
    </div>
  );
}
