"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { XpCounter } from "@/components/gamification/XpCounter";
import { StreakBadge } from "@/components/gamification/StreakBadge";
import { LivesDisplay } from "@/components/gamification/LivesDisplay";
import { getSupabase } from "@/lib/supabase";
import { useGameStore } from "@/stores/gameStore";

export function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const syncFromAPI = useGameStore((s) => s.syncFromAPI);

  useEffect(() => {
    const supabase = getSupabase();

    async function loadUser(userId: string) {
      try {
        const res = await fetch(`/api/user?userId=${userId}`);
        if (res.ok) {
          const user = await res.json();
          if (user.avatarUrl) setUserAvatar(user.avatarUrl);
          syncFromAPI({
            xp: user.xp ?? 0,
            hearts: user.lives ?? 5,
            streak: {
              currentStreak: user.streak ?? 0,
              longestStreak: user.streak ?? 0,
              lastActiveDate: user.lastActiveAt ?? null,
              isActiveToday: false,
            },
          });
        }
      } catch { /* ignore */ }
    }

    supabase.auth.getSession().then(async ({ data }) => {
      setIsLoggedIn(!!data.session);
      if (data.session?.user?.id) loadUser(data.session.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user?.id) loadUser(session.user.id);
      else setUserAvatar(null);
    });

    return () => listener.subscription.unsubscribe();
  }, [syncFromAPI]);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/learn" className="text-xl font-extrabold text-orange-500">
          FinLearn
        </Link>
        <div className="flex items-center gap-3">
          <StreakBadge />
          <XpCounter />
          <LivesDisplay />
          {isLoggedIn && (
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xl transition-colors hover:bg-orange-200"
              title="Mi perfil"
            >
              {userAvatar ?? "👤"}
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-orange-400 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-orange-500"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
