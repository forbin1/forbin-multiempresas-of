import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Shield, Users, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin — FORBIN" },
      { name: "description", content: "Painel administrativo da plataforma FORBIN." },
    ],
  }),
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/login" });
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw redirect({ to: "/" });
  },
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Administração</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Painel Admin</h1>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={Users} label="Profissionais" value="—" />
        <Card icon={Building2} label="Empresas" value="—" />
        <Card icon={Briefcase} label="Vagas ativas" value="—" />
        <Card icon={GraduationCap} label="Cursos" value="—" />
      </div>

      <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8">
        <h2 className="font-display text-xl font-bold">Atalhos</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full"><Link to="/vagas">Ver vagas</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/cursos">Ver cursos</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/feed">Ver feed</Link></Button>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
