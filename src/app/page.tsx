import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-extrabold text-orange-500">FinLearn</span>
        <div className="flex gap-3">
          <Link
            href="/learn"
            className="rounded-xl border-2 border-gray-200 px-5 py-2 text-sm font-bold text-gray-700 transition-colors hover:border-orange-300"
          >
            Entrar
          </Link>
          <Link
            href="/learn"
            className="rounded-xl bg-orange-400 px-5 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-orange-500"
          >
            Empezar gratis
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-gray-900">
          Aprende finanzas como si fuera un juego
        </h1>
        <p className="mt-4 max-w-lg text-lg text-gray-500">
          Lecciones cortas e interactivas sobre mercados, analisis crediticio, inversiones y mucho mas.
          Gana XP, mantiene tu racha y sube en el ranking.
        </p>
        <Link
          href="/learn"
          className="mt-8 rounded-xl bg-orange-400 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-orange-500"
        >
          Empezar ahora — es gratis
        </Link>

        {/* Feature cards */}
        <div className="mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: "🎯", title: "Lecciones de 5 min", desc: "Aprende en cualquier momento" },
            { icon: "🔥", title: "Rachas y XP", desc: "Mantente motivado cada dia" },
            { icon: "📊", title: "Finanzas reales", desc: "Contenido practico y aplicable" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border-2 border-gray-100 bg-white p-6 text-center">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="font-bold text-gray-800">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
