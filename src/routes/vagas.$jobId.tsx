import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Bookmark,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Share2,
  ShieldCheck,
  BadgeDollarSign,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JOBS } from "@/data/mock";

export const Route = createFileRoute("/vagas/$jobId")({
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.job.title} — FORBIN MultiEmpresas` },
          { name: "description", content: loaderData.job.description },
          { property: "og:title", content: loaderData.job.title },
          { property: "og:description", content: loaderData.job.description },
        ]
      : [],
  }),
  component: JobDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h2 className="font-display text-3xl font-bold">Vaga não encontrada</h2>
      <Link to="/vagas" className="mt-6 inline-block text-primary">← Voltar para vagas</Link>
    </div>
  ),
});

function JobDetail() {
  const { job } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    setApplied(true);
    setOpen(false);
    toast.success("Candidatura enviada!", {
      description: `Sua candidatura para "${job.title}" foi registrada. Acompanhe pelo Painel Profissional.`,
    });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: job.title, text: job.company, url });
      } else if (typeof navigator !== "undefined") {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado!");
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleSave = () => {
    setSaved((s) => !s);
    toast(saved ? "Vaga removida dos salvos" : "Vaga salva", {
      description: saved ? undefined : "Disponível em Vagas salvas no seu painel.",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/vagas" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Voltar para vagas
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Coluna principal */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-bold text-primary">
                  {job.companyInitials}
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</h1>
                  <p className="mt-1 text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <Badge className="rounded-full border-success/40 bg-success/15 text-success">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Empresa verificada
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Chip icon={<MapPin className="h-4 w-4" />}>{job.location}</Chip>
              <Chip icon={<Clock className="h-4 w-4" />}>{job.shift}</Chip>
              <Chip icon={<BadgeDollarSign className="h-4 w-4" />}>{job.salary}</Chip>
              <Chip icon={<Building2 className="h-4 w-4" />}>{job.type}</Chip>
            </div>
          </div>

          <Section title="Sobre a vaga">
            <p className="text-base leading-relaxed text-muted-foreground">{job.description}</p>
          </Section>

          <Section title="Requisitos">
            <ul className="space-y-3">
              {job.requirements.map((r: string) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Benefícios">
            <div className="grid gap-3 sm:grid-cols-2">
              {job.benefits.map((b: string) => (
                <div key={b} className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    ✓
                  </div>
                  <span className="text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Sidebar — candidatura */}
        <aside className="space-y-4">
          <div className="sticky top-28 rounded-3xl border border-primary/40 bg-card p-6 shadow-gold">
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span className="text-sm font-semibold text-success">Recebendo candidaturas</span>
            </div>

            <div className="mt-6 space-y-3">
              {applied ? (
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-success/40 bg-success/10 px-4 py-4 text-sm font-semibold text-success">
                  <CheckCircle2 className="h-5 w-5" /> Candidatura enviada
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className="h-14 w-full rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-gold hover:bg-primary/90"
                >
                  <Send className="mr-2 h-5 w-5" /> Candidatar-se
                </Button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className={`h-12 rounded-xl ${saved ? "border-primary/60 text-primary" : ""}`}
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-primary" : ""}`} />
                  {saved ? "Salvo" : "Salvar"}
                </Button>
                <Button variant="outline" onClick={handleShare} className="h-12 rounded-xl">
                  <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-border/60 pt-6 text-sm">
              <Row label="Publicada" value={job.posted} />
              <Row label="Candidatos" value={`${job.applicants + (applied ? 1 : 0)}`} />
              <Row label="Tipo" value={job.type} />
            </div>
          </div>
        </aside>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl border-border/60 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Confirmar candidatura</DialogTitle>
            <DialogDescription className="text-base">
              Você está se candidatando para <strong className="text-foreground">{job.title}</strong> na{" "}
              <strong className="text-foreground">{job.company}</strong>.
              <br />
              <br />
              Seu currículo cadastrado na FORBIN será enviado para o recrutador. Você poderá
              acompanhar o status no <strong className="text-primary">Painel Profissional</strong>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
              Cancelar
            </Button>
            <Button
              onClick={handleApply}
              className="rounded-xl bg-primary text-primary-foreground shadow-gold hover:bg-primary/90"
            >
              <Send className="mr-2 h-4 w-4" /> Confirmar candidatura
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-8">
      <h2 className="mb-5 font-display text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2 text-sm">
      <span className="text-primary">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
