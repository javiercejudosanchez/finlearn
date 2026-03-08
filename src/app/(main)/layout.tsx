"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="lg:pl-[72px]">{children}</main>
    </>
  );
}
