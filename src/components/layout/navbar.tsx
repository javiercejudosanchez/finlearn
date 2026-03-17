"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { getSupabase } from "@/lib/supabase";

export function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { hearts, streak, xp, globalMistakeCount, syncFromAPI } = useGameStore();

  useEffect(() => {
    const supabase = getSupabase();

    async function loadUser(userId: string) {
      try {
        const res = await fetch(`/api/user?userId=${userId}`);
        if (res.ok) {
          const user = await res.json();
          if (user.avatarUrl) setUserAvatar(user.avatarUrl);
          setUserName(user.name ?? user.email?.split("@")[0] ?? null);
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
      else { setUserAvatar(null); setUserName(null); }
    });

    return () => listener.subscription.unsubscribe();
  }, [syncFromAPI]);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-orange-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/learn" className="flex items-center gap-2">
          <span className="text-xl">🐯</span>
          <span className="text-xl font-extrabold text-orange-500 font-display">FinLearn</span>
        </Link>

        {/* Stats — desktop */}
        {isLoggedIn && (
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-600">
              ⭐ <span>{xp} pts</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-500">
              {Array.from({ length: Math.min(hearts, 5) }).map((_, i) => (
                <span key={i} className="text-sm">❤️</span>
              ))}
              {globalMistakeCount > 0 && (
                <span className="ml-1 text-xs text-gray-400">{globalMistakeCount}/70</span>
              )}
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
                🔥 <span>{streak}</span>
              </div>
            )}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xl transition-colors hover:bg-orange-200 border-2 border-orange-200"
              title={userName ?? "Mi perfil"}
            >
              {userAvatar ?? "👤"}
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-orange-400 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-orange-500 shadow-sm"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
