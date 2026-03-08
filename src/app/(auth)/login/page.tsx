"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/learn");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="mb-2 text-center text-3xl font-extrabold text-gray-800">
          Bienvenido de vuelta
        </h1>
        <p className="mb-8 text-center text-gray-500">Inicia sesion para continuar aprendiendo</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base outline-none transition-colors focus:border-green-500"
          />
          <input
            type="password"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base outline-none transition-colors focus:border-green-500"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-green-600 disabled:bg-gray-300"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold text-green-600 hover:underline">
            Registrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
