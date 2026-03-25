import { create } from "zustand";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v !== null ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function save(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

interface ShopState {
  purchasedItems: string[];
  activeTheme: string | null;
  tigerSkin: string | null;
  extraLives: number;
  skipTokens: number;
  retryTokens: number;
  hasPurchased: (itemId: string) => boolean;
  buyItem: (itemId: string, cost: number, currentXP: number, deductXP: (n: number) => void) => boolean;
  consumeSkipToken: () => boolean;
  consumeRetryToken: () => boolean;
  consumeExtraLife: (refillHearts: () => void) => boolean;
}

const CONSUMABLES = ["extra_life", "skip_question", "retry_test"];

export const useShopStore = create<ShopState>()((set, get) => ({
  purchasedItems: load("fl_shop_items", [] as string[]),
  activeTheme: load("fl_shop_theme", null as string | null),
  tigerSkin: load("fl_shop_tiger", null as string | null),
  extraLives: load("fl_shop_lives", 0),
  skipTokens: load("fl_shop_skips", 0),
  retryTokens: load("fl_shop_retries", 0),

  hasPurchased: (itemId) => {
    if (CONSUMABLES.includes(itemId)) return false;
    return get().purchasedItems.includes(itemId);
  },

  buyItem: (itemId, cost, currentXP, deductXP) => {
    const state = get();
    if (currentXP < cost) return false;
    if (!CONSUMABLES.includes(itemId) && state.purchasedItems.includes(itemId)) return false;

    deductXP(cost);

    if (itemId === "extra_life") {
      const n = state.extraLives + 1;
      save("fl_shop_lives", n);
      set({ extraLives: n });
    } else if (itemId === "skip_question") {
      const n = state.skipTokens + 1;
      save("fl_shop_skips", n);
      set({ skipTokens: n });
    } else if (itemId === "retry_test") {
      const n = state.retryTokens + 1;
      save("fl_shop_retries", n);
      set({ retryTokens: n });
    } else {
      const updated = [...state.purchasedItems, itemId];
      save("fl_shop_items", updated);
      if (itemId.startsWith("theme_")) {
        const theme = itemId.replace("theme_", "");
        save("fl_shop_theme", theme);
        set({ purchasedItems: updated, activeTheme: theme });
      } else if (itemId.startsWith("tiger_")) {
        const skin = itemId.replace("tiger_", "");
        save("fl_shop_tiger", skin);
        set({ purchasedItems: updated, tigerSkin: skin });
      } else {
        set({ purchasedItems: updated });
      }
    }
    return true;
  },

  consumeSkipToken: () => {
    const { skipTokens } = get();
    if (skipTokens <= 0) return false;
    const n = skipTokens - 1;
    save("fl_shop_skips", n);
    set({ skipTokens: n });
    return true;
  },

  consumeRetryToken: () => {
    const { retryTokens } = get();
    if (retryTokens <= 0) return false;
    const n = retryTokens - 1;
    save("fl_shop_retries", n);
    set({ retryTokens: n });
    return true;
  },

  consumeExtraLife: (refillHearts) => {
    const { extraLives } = get();
    if (extraLives <= 0) return false;
    const n = extraLives - 1;
    save("fl_shop_lives", n);
    set({ extraLives: n });
    refillHearts();
    return true;
  },
}));
