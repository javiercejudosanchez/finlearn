"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface LessonFooterProps {
  showContinue: boolean;
  wasCorrect: boolean | null;
  onContinue: () => void;
}

export function LessonFooter({
  showContinue,
  wasCorrect,
  onContinue,
}: LessonFooterProps) {
  if (!showContinue) return null;

  const bgColor =
    wasCorrect === true
      ? "bg-success/10 border-success/20"
      : wasCorrect === false
      ? "bg-danger/10 border-danger/20"
      : "bg-white border-gray-100";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-0 left-0 right-0 z-50 border-t ${bgColor}`}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-end px-4 py-3">
        <Button
          variant={wasCorrect ? "correct" : wasCorrect === false ? "incorrect" : "primary"}
          size="lg"
          onClick={onContinue}
          className="w-full sm:w-auto sm:min-w-[160px]"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
