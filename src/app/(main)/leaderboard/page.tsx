"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { getSupabase } from "@/lib/supabase";

type RankEntry = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  xp: number;
  isUser?: boolean;
};

const MOCK_USERS: RankEntry[] = [
  { id: "mock_1", name: "FinExpert",    avatarUrl: "🦊", xp: 480 },
  { id: "mock_2", name: "InversorPro",  avatarUrl: "🐻", xp: 350 },
  { id: "mock_3", name: "AhorradorTop", avatarUrl: "🐼", xp: 230 },
  { id: "mock_4", name: "Economista99", avatarUrl: "🦁", xp: 120 },
];

function buildRanking(apiData: RankEntry[], userId: string | null, userXP: number, userName: string | null): RankEntry[] {
  const realUsers = apiData.filter((u) => !u.id.startsWith("mock_") && u.id !== userId);
  const currentUser: RankEntry = { id: userId ?? "current", name: userName ?? "Tú", avatarUrl: "🐯", xp: userXP, isUser: true };
  const all: RankEntry[] = [...realUsers];
  MOCK_USERS.forEach((m) => { if (!all.find((e) => e.id === m.id)) all.push(m); });
  all.push(currentUser);
  return all.sort((a, b) => b.xp - a.xp);
}

export default function LeaderboardPage() {
  const { xp } = useGameStore();
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPos, setUserPos] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      const uid = session?.user?.id ?? null;
      let apiData: RankEntry[] = [];
      let userName: string | null = null;
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) apiData = await res.json();
      } catch { /* ignore */ }
      if (uid) {
        try {
          const res = await fetch(`/api/user?userId=${uid}`);
          if (res.ok) { const u = await res.json(); userName = u.name ?? u.email?.split("@")[0] ?? null; }
        } catch { /* ignore */ }
      }
      const built = buildRanking(apiData, uid, xp, userName);
      setRanking(built);
      const pos = built.findIndex((u) => u.isUser);
      setUserPos(pos >= 0 ? pos + 1 : null);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">🏆 Ranking</h1>
        {userPos !== null && (
          <p className="mt-1 text-sm text-gray-500">Tu posición actual: <span className="font-bold text-orange-500">#{userPos}</span></p>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {ranking.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 ${
                user.isUser ? "border-orange-400 bg-orange-50 shadow-sm" : "border-gray-100 bg-white"
              }`}
            >
              <span className="w-8 text-center text-lg font-bold text-gray-400">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
              </span>
              <span className="text-2xl">{user.avatarUrl || "🐻"}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-700 truncate">
                  {user.name ?? "Usuario"}{user.isUser ? " (tú)" : ""}
                </p>
                {i === 0 && <p className="text-xs text-amber-500 font-medium">Líder del ranking</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-amber-500">{user.xp} pts</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        El ranking se actualiza al completar tests 🎯
      </p>
    </div>
  );
}
