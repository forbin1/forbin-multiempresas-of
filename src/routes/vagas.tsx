import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOBS, COURSES } from "@/data/mock";
import { ADS, AdBanner } from "@/components/AdBanner";
import { Fragment } from "react";

export const Route = createFileRoute("/vagas")({
  head: () => ({
    meta: [
      { title: "Vagas — FORBIN MultiEmpresas" },
      { name: "description", content: "Explore vagas de segurança privada por região, função e tipo de contratação." },
    ],
  }),
  component: VagasPage,
});

const REGIONS = ["Todas", "São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná", "Santa Catarina", "Distrito Federal"];

function VagasPage() {
  const [region, setRegion] = useState("Todas");
  const [query, setQuery] = useState("");

  const filtered = JOBS.filter((j) => {
    const matchRegion = region === "Todas" || j.location.includes(region);
    const matchQuery = j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase());
    return matchRegion && matchQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Marketplace</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Encontre sua vaga de Emprego
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {JOBS.length} vagas ativas em todo o Brasil. Filtre por função, região ou tipo de contratação.
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-3xl border border-border/60 bg-card p-4 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cargo, palavra-chave ou empresa…"
            className="h-14 rounded-2xl border-border/60 bg-surface pl-12 text-base"
          />
        </div>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-14 w-full rounded-2xl border border-border/60 bg-surface pl-12 pr-8 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <Button className="h-14 rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90">
          <SlidersHorizontal className="mr-2 h-5 w-5" /> Filtros
        </Button>
      </div>

      {/* Pills de cursos */}
      <div className="mb-10 flex flex-wrap gap-2">
        {COURSES.slice(0, 8).map((c) => (
          <Badge
            key={c}
            variant="secondary"
            className="cursor-pointer rounded-full border-border/60 bg-surface px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
          >
            {c}
          </Badge>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((job, idx) => (
          <Fragment key={job.id}>
            <Link
              to="/vagas/$jobId"
              params={{ jobId: job.id }}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition hover:border-primary/50 hover:shadow-gold"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg font-bold">
                  {job.companyInitials}
                </div>
                <Badge className="rounded-full bg-surface-elevated text-xs text-muted-foreground">{job.type}</Badge>
              </div>
              <h3 className="text-lg font-semibold leading-tight transition group-hover:text-primary">{job.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>📍 {job.location}</span>
                <span>⏱ {job.shift}</span>
                <span>💰 {job.salary}</span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                <span className="text-muted-foreground">{job.posted}</span>
                <span className="font-semibold text-primary">{job.applicants} candidatos</span>
              </div>
            </Link>
            {(idx + 1) % 6 === 0 && (
              <AdBanner ad={ADS[Math.floor(idx / 6) % ADS.length]} />
            )}
          </Fragment>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-border/60 bg-card p-16 text-center">
          <p className="text-lg text-muted-foreground">Nenhuma vaga encontrada com esses filtros.</p>
        </div>
      )}
    </div>
  );
}
