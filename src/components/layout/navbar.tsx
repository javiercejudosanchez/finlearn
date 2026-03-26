"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Trophy, BookOpen, ShoppingBag, User } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { getSupabase } from "@/lib/supabase";

const NAV_ITEMS = [
  { href: "/learn",       Icon: Home,        label: "Inicio"     },
  { href: "/leaderboard", Icon: Trophy,       label: "Ranking"    },
  { href: "/cards",       Icon: BookOpen,     label: "Mis cartas" },
  { href: "/shop",        Icon: ShoppingBag,  label: "Tienda"     },
  { href: "/profile",     Icon: User,         label: "Perfil"     },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { hearts, streak, xp, globalMistakeCount, syncFromAPI } = useGameStore();

  useEffect(() => {
    const supabase = getSupabase();

    async function loadUser(userId: string) {
      try {
        const res = await fetch(`/api/user?userId=${userId}`);
        if (res.ok) {
          const user = await res.json();
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

    });

    return () => listener.subscription.unsubscribe();
  }, [syncFromAPI]);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push("/login");
  };


  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-orange-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/learn" className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🐯</span>
            <span className="text-xl font-extrabold text-orange-500 font-display">FinLearn</span>
          </Link>

          {/* Center nav — desktop only */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map(({ href, Icon, label }) => {
                const isActive = pathname === href || (href !== "/learn" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    title={label}
                    className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2">
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

      {/* Mobile bottom tab bar */}
      {isLoggedIn && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden items-center justify-around border-t border-orange-100 bg-white/95 backdrop-blur-sm px-1 py-2">
          {NAV_ITEMS.map(({ href, Icon, label }) => {
            const isActive = pathname === href || (href !== "/learn" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-400"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className={`text-[9px] font-medium ${isActive ? "text-orange-500" : "text-gray-400"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
