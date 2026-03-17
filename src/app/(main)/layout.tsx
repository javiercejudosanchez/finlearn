"use client";

import { Navbar } from "@/components/layout/navbar";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10">
        <div className="flex gap-6 items-start">
          {/* Left panel — desktop only */}
          <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-20">
            <LeftPanel />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

          {/* Right panel — large desktop only */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-20">
            <RightPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
