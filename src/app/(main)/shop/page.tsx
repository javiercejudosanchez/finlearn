"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { useShopStore } from "@/stores/shopStore";

const SHOP_ITEMS = [
  {
    id: "theme_blue",
    icon: "🎨",
    name: "Tema Azul",
    desc: "Cambia los acentos de la app a tonos azules",
    cost: 200,
    category: "temas",
  },
  {
    id: "theme_green",
    icon: "🎨",
    name: "Tema Verde",
    desc: "Cambia los acentos de la app a tonos verdes",
    cost: 200,
    category: "temas",
  },
  {
    id: "theme_purple",
    icon: "🎨",
    name: "Tema Morado",
    desc: "Cambia los acentos de la app a tonos morados",
    cost: 200,
    category: "temas",
  },
  {
    id: "tiger_golden",
    icon: "🐯",
    name: "Tigre dorado",
    desc: "El tigre mascota se vuelve dorado ✨",
    cost: 500,
    category: "mascotas",
  },
  {
    id: "tiger_sunglasses",
    icon: "😎",
    name: "Tigre con gafas",
    desc: "El tigre lleva unas gafas de sol muy chulas",
    cost: 300,
    category: "mascotas",
  },
  {
    id: "extra_life",
    icon: "❤️",
    name: "Vida extra",
    desc: "Recupera 1 vida (se aplica inmediatamente)",
    cost: 150,
    category: "consumibles",
  },
  {
    id: "skip_question",
    icon: "⏭️",
    name: "Saltar pregunta",
    desc: "Salta 1 pregunta en un test sin penalización",
    cost: 100,
    category: "consumibles",
  },
  {
    id: "retry_test",
    icon: "🔄",
    name: "Reiniciar test",
    desc: "Repite un test desde cero sin perder vidas",
    cost: 50,
    category: "consumibles",
  },
];

const THEME_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200"   },
  green:  { bg: "bg-emerald-50",text: "text-emerald-600",border: "border-emerald-200"},
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
};

type Category = "todos" | "temas" | "mascotas" | "consumibles";

export default function ShopPage() {
  const { xp, deductXP, refillHearts } = useGameStore();
  const shop = useShopStore();
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [justBought, setJustBought] = useState<string | null>(null);

  const filtered = activeCategory === "todos"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((i) => i.category === activeCategory);

  function handleBuy(item: typeof SHOP_ITEMS[number]) {
    if (xp < item.cost) return;
    const success = shop.buyItem(item.id, item.cost, xp, deductXP);
    if (success) {
      if (item.id === "extra_life") refillHearts();
      setJustBought(item.id);
      setTimeout(() => setJustBought(null), 1500);
    }
  }

  const activeThemeColors = shop.activeTheme ? THEME_COLORS[shop.activeTheme] : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">🛒 Tienda</h1>
          <p className="mt-0.5 text-sm text-gray-500">Gasta tus puntos en recompensas</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2">
          <span className="text-xl">⭐</span>
          <div>
            <p className="text-lg font-extrabold text-amber-600">{xp}</p>
            <p className="text-xs text-amber-500">puntos</p>
          </div>
        </div>
      </div>

      {/* Active theme/skin */}
      {(shop.activeTheme || shop.tigerSkin) && (
        <div className={`mb-4 rounded-xl border p-3 flex items-center gap-3 ${activeThemeColors?.bg ?? "bg-gray-50"} ${activeThemeColors?.border ?? "border-gray-200"}`}>
          <span className="text-2xl">✨</span>
          <div>
            <p className={`text-sm font-bold ${activeThemeColors?.text ?? "text-gray-700"}`}>
              {shop.activeTheme ? `Tema ${shop.activeTheme} activo` : ""}{shop.tigerSkin ? ` · Tigre ${shop.tigerSkin}` : ""}
            </p>
            <p className="text-xs text-gray-500">Tus compras están aplicadas</p>
          </div>
        </div>
      )}

      {/* Consumables counter */}
      {(shop.skipTokens > 0 || shop.retryTokens > 0 || shop.extraLives > 0) && (
        <div className="mb-4 flex gap-2">
          {shop.extraLives > 0 && (
            <span className="rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold text-red-500">
              ❤️ ×{shop.extraLives} vida{shop.extraLives !== 1 ? "s" : ""}
            </span>
          )}
          {shop.skipTokens > 0 && (
            <span className="rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-bold text-blue-500">
              ⏭️ ×{shop.skipTokens} salto{shop.skipTokens !== 1 ? "s" : ""}
            </span>
          )}
          {shop.retryTokens > 0 && (
            <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-500">
              🔄 ×{shop.retryTokens} reinicio{shop.retryTokens !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* Category filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {(["todos", "temas", "mascotas", "consumibles"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              activeCategory === cat
                ? "bg-orange-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        {filtered.map((item) => {
          const owned = shop.hasPurchased(item.id);
          const canAfford = xp >= item.cost;
          const isBought = justBought === item.id;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className={`relative rounded-2xl border-2 bg-white p-4 shadow-sm flex flex-col gap-3 transition-colors ${
                owned ? "border-emerald-300 bg-emerald-50" : canAfford ? "border-orange-100 hover:border-orange-200" : "border-gray-100 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-3xl">{item.icon}</span>
                {owned && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    ✓ Adquirido
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  ⭐ {item.cost}
                </span>
                {!owned && (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                      canAfford
                        ? "bg-orange-400 text-white hover:bg-orange-500"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {canAfford ? "Comprar" : "Sin puntos"}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isBought && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-emerald-400/90"
                  >
                    <span className="text-3xl">✅</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">
        Gana puntos completando tests y misiones semanales 🎯
      </p>
    </div>
  );
}
