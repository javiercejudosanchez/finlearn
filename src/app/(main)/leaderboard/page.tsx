"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSupabase } from "@/lib/supabase";

type RankEntry = {
  id: string;
  name: string | null;
  avatar: string;
  xp: number;
  isUser?: boolean;
};

export default function LeaderboardPage() {
  const [ranking, setRanking] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data: RankEntry[] = await res.json();
          const withUser = data.map((u) => ({ ...u, isUser: u.id === session?.user?.id }));
          setRanking(withUser);
        }
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800">Ranking</h1>
      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : ranking.length === 0 ? (
        <p className="text-center text-gray-400">Aun no hay datos de ranking.</p>
      ) : (
        <div className="space-y-3">
          {ranking.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 ${
                user.isUser ? "border-green-400 bg-green-50" : "border-gray-100 bg-white"
              }`}
            >
              <span className="w-8 text-center text-lg font-bold text-gray-400">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
              </span>
              <span className="text-2xl">{user.avatar || "🐻"}</span>
              <span className="flex-1 font-semibold text-gray-700">
                {user.name ?? "Usuario"}{user.isUser ? " (tu)" : ""}
              </span>
              <span className="font-bold text-amber-500">{user.xp} pts</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
