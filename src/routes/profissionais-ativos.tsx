import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { MessageCircle, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profissionais-ativos")({
  head: () => ({
    meta: [
      { title: "Profissionais Ativos — FORBIN" },
      { name: "description", content: "Profissionais de segurança privada disponíveis." },
    ],
  }),
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/login" });
  },
  component: ProfissionaisAtivos,
});

const PROFISSIONAIS = [
  { id: "1", name: "Carlos Silva", role: "Vigilante CLT", location: "São Paulo, SP", initials: "CS", whatsapp: "5511999999999", bio: "Vigilante com 8 anos de experiência em condomínios premium." },
  { id: "2", name: "Renata Oliveira", role: "Operadora de CFTV", location: "Curitiba, PR", initials: "RO", whatsapp: "5541988887777", bio: "Especialista em monitoramento inteligente." },
  { id: "3", name: "Marcos Tavares", role: "Supervisor de Segurança", location: "Belo Horizonte, MG", initials: "MT", whatsapp: "5531977776666", bio: "Supervisor com formação em defesa pessoal e gestão de equipes." },
  { id: "4", name: "Júlia Santos", role: "Escolta Armada", location: "Rio de Janeiro, RJ", initials: "JS", whatsapp: "5521966665555", bio: "Escolta armada com curso avançado e porte renovado." },
  { id: "5", name: "Pedro Almeida", role: "Bombeiro Civil", location: "Salvador, BA", initials: "PA", whatsapp: "5571955554444", bio: "Bombeiro civil com atuação em eventos e empresas." },
  { id: "6", name: "Ana Costa", role: "Vigilante Líder", location: "Brasília, DF", initials: "AC", whatsapp: "5561944443333", bio: "Líder de equipe com experiência em órgãos públicos." },
];

function ProfissionaisAtivos() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Talentos verificados</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Profissionais Ativos</h1>
        <p className="mt-2 text-muted-foreground">Conecte-se com profissionais de segurança privada disponíveis.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROFISSIONAIS.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border/60 bg-card p-6">
            <Link to="/profissionais-ativos/$id" params={{ id: p.id }} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {p.initials}
              </div>
              <div>
                <h3 className="font-semibold leading-tight">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.role}</p>
              </div>
            </Link>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {p.location}
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.bio}</p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                <Link to="/profissionais-ativos/$id" params={{ id: p.id }}>
                  <Shield className="mr-1.5 h-4 w-4" /> Ver perfil
                </Link>
              </Button>
              <Button asChild size="sm" className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
