import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  MoreVertical,
  CheckCircle2,
  Eye,
  MessageSquare,
  XCircle,
  ShieldCheck,
  MapPin,
  Globe,
  Phone,
  Mail,
  Building2,
  Award,
  Star,
  Linkedin,
  Instagram,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JOBS } from "@/data/mock";

export const Route = createFileRoute("/empresa")({
  head: () => ({
    meta: [
      { title: "Painel da Empresa — FORBIN" },
      { name: "description", content: "Gerencie vagas, candidatos e reuniões da sua empresa." },
    ],
  }),
  component: PainelEmpresa,
});

const CANDIDATES = [
  { name: "Carlos Mendes", role: "Vigilante Líder", years: 8, courses: 5, status: "Novo", initials: "CM" },
  { name: "André Lima", role: "Escolta Armada", years: 6, courses: 4, status: "Em análise", initials: "AL" },
  { name: "Renata Oliveira", role: "Operadora CFTV", years: 4, courses: 3, status: "Reunião marcada", initials: "RO" },
  { name: "Marcos Tavares", role: "Supervisor", years: 10, courses: 6, status: "Novo", initials: "MT" },
  { name: "Juliana Costa", role: "Vigilante", years: 3, courses: 2, status: "Em análise", initials: "JC" },
];

function PainelEmpresa() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Painel da empresa</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Vigilância Total LTDA</h1>
        </div>
        <Button className="h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-gold hover:bg-primary/90">
          <Plus className="mr-2 h-5 w-5" /> Criar nova vaga
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Briefcase} label="Vagas ativas" value="12" trend="+2 esta semana" />
        <Kpi icon={Users} label="Candidatos totais" value="248" trend="+47 hoje" />
        <Kpi icon={Calendar} label="Reuniões agendadas" value="9" trend="3 esta semana" />
        <Kpi icon={TrendingUp} label="Taxa de conversão" value="18%" trend="+4% mês" highlight />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <Tabs defaultValue="candidatos">
            <TabsList className="h-12 rounded-2xl bg-card p-1">
              <TabsTrigger value="candidatos" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Candidatos
              </TabsTrigger>
              <TabsTrigger value="vagas" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Minhas vagas
              </TabsTrigger>
              <TabsTrigger value="reunioes" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Agenda
              </TabsTrigger>
            </TabsList>

            <TabsContent value="candidatos" className="mt-6">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
                <div className="border-b border-border/60 p-5">
                  <h2 className="font-display text-lg font-bold">Candidatos recentes</h2>
                  <p className="text-sm text-muted-foreground">Analise perfis e marque reuniões.</p>
                </div>
                <ul>
                  {CANDIDATES.map((c) => (
                    <li key={c.name} className="flex flex-wrap items-center gap-4 border-b border-border/40 p-5 last:border-0 hover:bg-surface/60">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold font-bold text-primary-foreground">
                        {c.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-muted-foreground">{c.role} · {c.years} anos · {c.courses} cursos</p>
                      </div>
                      <StatusBadge status={c.status} />
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="rounded-full">
                          <Link to="/profissional"><Eye className="mr-1 h-4 w-4" /> Ver</Link>
                        </Button>
                        <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                          <Calendar className="mr-1 h-4 w-4" /> Marcar reunião
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="vagas" className="mt-6 space-y-3">
              {JOBS.slice(0, 5).map((j) => (
                <div key={j.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold">
                    {j.companyInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{j.title}</p>
                    <p className="text-sm text-muted-foreground">{j.location} · {j.shift}</p>
                  </div>
                  <Badge className="rounded-full bg-primary/15 text-primary">{j.applicants} candidatos</Badge>
                  <Badge className="rounded-full border-success/40 bg-success/15 text-success">Ativa</Badge>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reunioes" className="mt-6 space-y-3">
              {[
                { name: "Carlos Mendes", role: "Vigilante Líder", when: "Hoje · 14:00", mode: "Vídeo" },
                { name: "Renata Oliveira", role: "CFTV", when: "Amanhã · 10:30", mode: "Presencial" },
                { name: "André Lima", role: "Escolta", when: "Sex · 16:00", mode: "Vídeo" },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-muted-foreground">{r.role} · {r.when}</p>
                  </div>
                  <Badge className="rounded-full bg-surface-elevated text-muted-foreground">{r.mode}</Badge>
                  <Button variant="outline" size="sm" className="rounded-full"><MessageSquare className="mr-1 h-4 w-4" /> Entrar</Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-transparent p-6">
            <h3 className="font-display text-lg font-bold">Plano Premium</h3>
            <p className="mt-1 text-sm text-muted-foreground">Vagas ilimitadas, destaque no marketplace e selo verificado.</p>
            <Button asChild className="mt-4 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/planos">Conhecer planos</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Atividade recente</h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: CheckCircle2, color: "text-success", text: "Reunião com Carlos confirmada" },
                { icon: Users, color: "text-primary", text: "5 novos candidatos para Escolta" },
                { icon: Eye, color: "text-muted-foreground", text: "Sua vaga de CFTV teve 89 visualizações" },
                { icon: XCircle, color: "text-destructive", text: "Vaga de Porteiro expirou" },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <a.icon className={`mt-0.5 h-4 w-4 shrink-0 ${a.color}`} />
                  <span className="text-muted-foreground">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, trend, highlight }: { icon: React.ElementType; label: string; value: string; trend: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? "border-primary/40 bg-gradient-to-br from-primary/15 to-transparent" : "border-border/60 bg-card"}`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${highlight ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs text-success">{trend}</span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Novo": "bg-primary/15 text-primary",
    "Em análise": "bg-surface-elevated text-muted-foreground",
    "Reunião marcada": "bg-success/15 text-success",
  };
  return <Badge className={`rounded-full ${styles[status] ?? "bg-surface-elevated"}`}>{status}</Badge>;
}
