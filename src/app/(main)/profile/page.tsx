"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { LevelProgress } from "@/components/gamification/LevelProgress";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";

const AVATARS = [
  "🐻", "🦊", "🐼", "🦁", "🐯", "🐺", "🦝", "🐨",
  "🦊", "🐸", "🐧", "🦉", "🦋", "🐬", "🦄", "🐲",
  "🧑‍💼", "👩‍💻", "🧑‍🎓", "🏆",
];

const BADGES = [
  { id: "first_lesson", icon: "🎓", label: "Primera lección", desc: "Completa tu primera lección" },
  { id: "streak_3",     icon: "🔥", label: "Racha de 3 días", desc: "Estudia 3 días seguidos" },
  { id: "perfect",      icon: "⭐", label: "Sin fallos",      desc: "Completa un test sin errores" },
  { id: "level1",       icon: "🏆", label: "Nivel 1 superado", desc: "Termina todas las lecciones del nivel 1" },
];

type UserData = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  email: string;
  lessonsCompleted: number;
  createdAt?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { xp, streak, hearts, globalMistakeCount, syncFromAPI } = useGameStore();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [savingName, setSavingName] = useState(false);

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session?.user?.id) { router.push("/login"); return; }
      try {
        const res = await fetch(`/api/user?userId=${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          setNameInput(data.name ?? "");
          syncFromAPI({
            xp: data.xp ?? 0,
            hearts: data.lives ?? 5,
            streak: { currentStreak: data.streak ?? 0, longestStreak: data.streak ?? 0, lastActiveDate: data.lastActiveAt ?? null, isActiveToday: false },
          });
        }
      } catch { /* fallback */ }
      setLoading(false);
    }
    load();
  }, [router, syncFromAPI]);

  const saveName = async () => {
    if (!userData) return;
    setSavingName(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData.id, name: nameInput }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUserData((d) => d ? { ...d, name: updated.name } : d);
        setEditingName(false);
      }
    } finally { setSavingName(false); }
  };

  const saveAvatar = async (emoji: string) => {
    if (!userData) return;
    setUserData((d) => d ? { ...d, avatarUrl: emoji } : d);
    setShowAvatarPicker(false);
    await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.id, avatarUrl: emoji }),
    });
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg("La contrasena debe tener al menos 6 caracteres.");
      return;
    }
    setChangingPassword(true);
    const { error } = await getSupabase().auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordMsg("Error: " + error.message);
    } else {
      setPasswordMsg("Contrasena cambiada correctamente.");
      setNewPassword("");
    }
    setChangingPassword(false);
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-gray-400">Cargando perfil...</p></div>;
  }

  const displayName = userData?.name ?? userData?.email?.split("@")[0] ?? "Usuario";
  const avatar = userData?.avatarUrl ?? "🐻";

  // Compute earned badges
  const earnedBadges = new Set<string>();
  if ((userData?.lessonsCompleted ?? 0) >= 1) earnedBadges.add("first_lesson");
  if (streak >= 3) earnedBadges.add("streak_3");
  // "perfect" and "level1" require more data — keep locked for now

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      {/* Back */}
      <div className="mb-4 flex items-center gap-2">
        <Link href="/learn" className="flex items-center gap-1 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Volver</span>
        </Link>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setShowAvatarPicker(true)}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl transition-transform hover:scale-105 border-4 border-orange-200"
        >
          {avatar}
          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow">✏️</span>
        </button>

        {editingName ? (
          <div className="flex items-center gap-2">
            <input autoFocus className="rounded-xl border-2 border-orange-400 px-3 py-1.5 text-lg font-bold text-gray-800 outline-none"
              value={nameInput} onChange={(e) => setNameInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveName()} />
            <Button onClick={saveName} disabled={savingName} className="text-sm">{savingName ? "..." : "Guardar"}</Button>
            <Button variant="ghost" onClick={() => setEditingName(false)} className="text-sm">Cancelar</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-800">{displayName}</h1>
            <button onClick={() => setEditingName(true)} className="text-gray-400 hover:text-gray-600">✏️</button>
          </div>
        )}
        {userData?.email && <p className="text-sm text-gray-400">{userData.email}</p>}
        {userData?.createdAt && (
          <p className="text-xs text-gray-400">
            Miembro desde {new Date(userData.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-center text-lg font-extrabold text-gray-800">Elige tu avatar</h3>
            <div className="grid grid-cols-5 gap-3">
              {AVATARS.map((emoji, i) => (
                <button key={i} onClick={() => saveAvatar(emoji)}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all hover:scale-110 ${avatar === emoji ? "bg-orange-100 ring-2 ring-orange-400" : "bg-gray-50 hover:bg-gray-100"}`}>
                  {emoji}
                </button>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAvatarPicker(false)}>Cancelar</Button>
          </motion.div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid grid-cols-4 gap-3">
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm border border-orange-100">
          <p className="text-xl font-bold text-amber-600">{xp}</p>
          <p className="text-xs text-gray-500">Puntos</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm border border-orange-100">
          <p className="text-xl font-bold text-orange-500">{streak}</p>
          <p className="text-xs text-gray-500">Racha</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm border border-orange-100">
          <p className="text-xl font-bold text-red-500">{hearts} ❤️</p>
          <p className="text-xs text-gray-500 leading-tight">Vidas<br /><span className="text-[10px] text-gray-400">{globalMistakeCount}/70</span></p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm border border-orange-100">
          <p className="text-xl font-bold text-emerald-600">{userData?.lessonsCompleted ?? 0}</p>
          <p className="text-xs text-gray-500">Lecciones</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm border border-orange-100">
        <LevelProgress />
      </div>

      {/* Badges */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-orange-100">
        <h2 className="mb-4 font-bold text-gray-700">Insignias</h2>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedBadges.has(badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                title={badge.desc}
                className="flex flex-col items-center gap-1"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl border-2 ${earned ? "bg-amber-50 border-amber-300 shadow-sm" : "bg-gray-100 border-gray-200 grayscale opacity-50"}`}>
                  {badge.icon}
                </div>
                <span className="text-center text-[10px] font-medium text-gray-500 leading-tight">{badge.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Account info */}
      <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold text-gray-700">Cuenta</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500">Email</label>
            <p className="mt-1 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-700">{userData?.email}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Contrasena</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5">
              <span className="flex-1 text-sm tracking-widest text-gray-500">
                {showCurrentPassword ? "No disponible por seguridad" : "••••••••"}
              </span>
              <button onClick={() => setShowCurrentPassword((v) => !v)} className="text-gray-400 hover:text-gray-600">
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
        <button className="flex w-full items-center justify-between font-bold text-gray-700" onClick={() => setShowPasswordSection((v) => !v)}>
          Cambiar contrasena
          <span className="text-gray-400">{showPasswordSection ? "▲" : "▼"}</span>
        </button>
        {showPasswordSection && (
          <div className="mt-4">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Nueva contrasena (min. 6 caracteres)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 pr-10 text-sm outline-none transition-colors focus:border-orange-400"
              />
              <button type="button" onClick={() => setShowNewPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordMsg && <p className={`mt-2 text-xs ${passwordMsg.startsWith("Error") ? "text-red-500" : "text-emerald-600"}`}>{passwordMsg}</p>}
            <Button onClick={changePassword} disabled={changingPassword} className="mt-3 w-full">
              {changingPassword ? "Guardando..." : "Actualizar contrasena"}
            </Button>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="mt-4">
        <Button variant="danger" className="w-full" onClick={async () => {
          await getSupabase().auth.signOut();
          router.push("/login");
        }}>
          Cerrar sesion
        </Button>
      </div>
    </div>
  );
}
