"use client";

import { Howl } from "howler";

const cache = new Map<string, Howl>();

function getSound(name: string): Howl {
  if (!cache.has(name)) {
    cache.set(
      name,
      new Howl({ src: [`/sounds/${name}.mp3`], volume: 0.5, preload: true })
    );
  }
  return cache.get(name)!;
}

export function playCorrect() {
  getSound("correct").play();
}

export function playIncorrect() {
  getSound("incorrect").play();
}

export function playComplete() {
  getSound("complete").play();
}

export function playClick() {
  getSound("click").play();
}

// Legacy object API (used by exercise components)
export const sounds = {
  correct: playCorrect,
  incorrect: playIncorrect,
  complete: playComplete,
  click: playClick,
};
