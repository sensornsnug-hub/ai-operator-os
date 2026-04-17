import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container-shell py-4">
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <section className="min-h-screen">{children}</section>
      </div>
    </main>
  );
}
