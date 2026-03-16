"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const steps = [
  {
    title: "Bienvenido a FinLearn!",
    description: "Aprende finanzas de forma interactiva, con lecciones cortas y divertidas.",
    icon: "🎓",
  },
  {
    title: "Cual es tu nivel?",
    description: "Elige tu punto de partida para personalizar tu experiencia.",
    icon: "📊",
    options: ["Principiante — nunca he estudiado finanzas", "Intermedio — conozco lo basico", "Avanzado — quiero profundizar"],
  },
  {
    title: "Que te interesa mas?",
    description: "Selecciona los temas que quieres aprender primero.",
    icon: "🎯",
    options: ["Finanzas personales", "Mercados e inversiones", "Analisis crediticio", "Macroeconomia"],
    multi: true,
  },
  {
    title: "Meta diaria",
    description: "Cuanto tiempo quieres dedicar cada dia?",
    icon: "⏰",
    options: ["5 min — casual", "10 min — regular", "15 min — intensivo", "20 min — experto"],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const toggleOption = (option: string) => {
    const prev = selections[step] || [];
    if (current.multi) {
      setSelections({
        ...selections,
        [step]: prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      });
    } else {
      setSelections({ ...selections, [step]: [option] });
    }
  };

  const handleNext = () => {
    if (isLast) {
      router.push("/learn");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Link
        href="/register"
        className="absolute left-4 top-4 flex items-center gap-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm">Volver</span>
      </Link>
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i <= step ? "bg-orange-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-4 text-5xl">{current.icon}</div>
            <h1 className="mb-2 text-2xl font-extrabold text-gray-800">{current.title}</h1>
            <p className="mb-6 text-gray-500">{current.description}</p>

            {current.options && (
              <div className="space-y-3 text-left">
                {current.options.map((option) => {
                  const selected = (selections[step] || []).includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-colors ${
                        selected
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          disabled={current.options && !(selections[step]?.length)}
          className="mt-8 w-full rounded-xl bg-orange-400 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-orange-500 disabled:bg-gray-300"
        >
          {isLast ? "Empezar!" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
