"use client";

import { motion } from "framer-motion";

const demoRanking = [
  { name: "Ana G.", xp: 2450, avatar: "🦊" },
  { name: "Carlos R.", xp: 2100, avatar: "🐺" },
  { name: "Tu", xp: 1800, avatar: "🐻", isUser: true },
  { name: "Maria L.", xp: 1650, avatar: "🦉" },
  { name: "Pedro S.", xp: 1200, avatar: "🐯" },
];

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800">Ranking semanal</h1>
      <div className="space-y-3">
        {demoRanking.map((user, i) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 rounded-xl border-2 p-4 ${
              user.isUser ? "border-green-400 bg-green-50" : "border-gray-100 bg-white"
            }`}
          >
            <span className="w-8 text-center text-lg font-bold text-gray-400">{i + 1}</span>
            <span className="text-2xl">{user.avatar}</span>
            <span className="flex-1 font-semibold text-gray-700">{user.name}</span>
            <span className="font-bold text-amber-500">{user.xp} XP</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
