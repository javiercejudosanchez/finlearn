"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "@/lib/supabase";
import world1 from "@/content/worlds/world-1.json";
import world2 from "@/content/worlds/world-2.json";
import world3 from "@/content/worlds/world-3.json";

type Card = { id: string; title: string; content: string; lessonTitle: string; worldTitle: string };

function extractCards(): Card[] {
  const worlds = [world1, world2, world3] as unknown as {
    title: string;
    units: Array<{
      lessons: Array<{
        id: string;
        title: string;
        phases?: Array<{
          type: string;
          cards?: Array<{ id: string; title: string; content: string }>;
        }>;
      }>;
    }>;
  }[];

  const cards: Card[] = [];
  worlds.forEach((w) => {
    w.units.forEach((u) => {
      u.lessons.forEach((l) => {
        l.phases?.forEach((p) => {
          if (p.type === "theory" && p.cards) {
            p.cards.forEach((c) => {
              cards.push({ id: c.id, title: c.title, content: c.content, lessonTitle: l.title, worldTitle: w.title });
            });
          }
        });
      });
    });
  });
  return cards;
}

const ALL_CARDS = extractCards();

export default function CardsPage() {
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/progress?userId=${session.user.id}`);
          if (res.ok) {
            const data: Array<{ lessonId: string; theoryCompleted: boolean }> = await res.json();
            setCompletedLessonIds(new Set(data.filter((d) => d.theoryCompleted).map((d) => d.lessonId)));
          }
        } catch { /* ignore */ }
      }
      setLoading(false);
    }
    load();
  }, []);

  const toggleFlip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Show cards from lessons where theory is completed, or all if none completed
  const availableCards = completedLessonIds.size === 0
    ? ALL_CARDS.slice(0, 6) // show first 6 as preview
    : ALL_CARDS.filter((c) => {
        // Find which lesson this card belongs to
        const worldData = [world1, world2, world3] as unknown as { units: Array<{ lessons: Array<{ id: string; phases?: Array<{ type: string; cards?: Array<{ id: string }> }> }> }> }[];
        for (const w of worldData) {
          for (const u of w.units) {
            for (const l of u.lessons) {
              if (l.phases?.some((p) => p.cards?.some((cc) => cc.id === c.id))) {
                return completedLessonIds.has(l.id);
              }
            }
          }
        }
        return false;
      });

  const filtered = availableCards.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase()) ||
           c.lessonTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">📚 Mis cartas</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          {availableCards.length} carta{availableCards.length !== 1 ? "s" : ""} desbloqueada{availableCards.length !== 1 ? "s" : ""}
          {completedLessonIds.size === 0 && " · completa lecciones para desbloquear más"}
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Buscar cartas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-orange-400"
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">📭</span>
          <p className="font-bold text-gray-600">No se encontraron cartas</p>
          <p className="text-sm text-gray-400">Completa lecciones para desbloquear cartas de estudio</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((card) => {
              const isFlipped = flipped.has(card.id);
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                  className="cursor-pointer"
                  onClick={() => toggleFlip(card.id)}
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative min-h-40"
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-white border-2 border-orange-100 p-4 shadow-sm flex flex-col justify-between"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">{card.worldTitle}</p>
                        <p className="mt-0.5 text-[10px] text-gray-400">{card.lessonTitle}</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm leading-tight">{card.title}</p>
                        <p className="mt-2 text-[10px] text-gray-400">Toca para ver el contenido</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-orange-50 border-2 border-orange-200 p-4 shadow-sm flex flex-col justify-center overflow-hidden"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-6">{card.content}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
