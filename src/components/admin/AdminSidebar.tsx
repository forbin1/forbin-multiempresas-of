import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Video,
  GraduationCap,
  Briefcase,
  Users,
  Sparkles,
  LayoutTemplate,
  CreditCard,
  Award,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/vsl", label: "VSL", icon: Video },
  { to: "/admin/cursos", label: "Cursos", icon: GraduationCap },
  { to: "/admin/vagas", label: "Vagas", icon: Briefcase },
  { to: "/admin/profissionais", label: "Profissionais", icon: Users },
  { to: "/admin/experiencias", label: "Experiências", icon: Sparkles },
  { to: "/admin/landing", label: "Landing Page", icon: LayoutTemplate },
  { to: "/admin/planos", label: "Planos", icon: CreditCard },
  { to: "/admin/certificados", label: "Certificados", icon: Award },
] as const;

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card lg:flex">
      <div className="flex h-20 items-center border-b border-border/60 px-6">
        <Logo />
      </div>

      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Shield className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Admin</p>
          <p className="text-xs text-muted-foreground">Painel de controle</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-border/60 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à plataforma
        </Link>
      </div>
    </aside>
  );
}

export function AdminMobileBar() {
  return (
    <div className="flex items-center justify-between border-b border-border/60 bg-card px-4 py-3 lg:hidden">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Plataforma
      </Link>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</p>
      <div className="w-20" />
    </div>
  );
}
