import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Zap, Rocket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Assinaturas — FORBIN" },
      {
        name: "description",
        content:
          "Escolha o plano ideal: Profissional R$19,90/mês ou planos Essencial e Premium para empresas que contratam segurança.",
      },
    ],
  }),
  component: PlanosPage,
});

const PROFESSIONAL = {
  name: "Profissional",
  price: "R$ 19,90",
  period: "/mês",
  icon: User,
  description: "Para profissionais de segurança que querem crescer na carreira.",
  features: [
    "Acesso completo ao feed da comunidade",
    "Postagem de fotos, vídeos e experiências",
    "Cursos gratuitos liberados",
    "Candidatura ilimitada em vagas",
    "Marcação de reuniões com empresas",
  ],
  cta: "Assinar Profissional",
  ctaTo: "/cadastro",
  highlight: false,
};

const COMPANY_PLANS = [
  {
    name: "Essencial",
    price: "R$ 297,90",
    period: "/mês",
    icon: Zap,
    tag: "Mais escolhido",
    description: "Ideal para empresas que querem crescer com eficiência na contratação.",
    features: [
      "Geração contínua de oportunidades de emprego",
      "Análise estratégica dos profissionais ideais para sua necessidade",
      "Acesso a uma base com mais de 5.000 profissionais qualificados",
      "Otimização do processo de recrutamento",
    ],
    footer: "Indicado para quem busca agilidade e assertividade nas contratações.",
    cta: "Começar com Essencial",
    highlight: true,
  },
  {
    name: "Premium",
    price: "R$ 497,90",
    period: "/mês",
    icon: Rocket,
    tag: "Suporte completo",
    description: "Para empresas que querem crescimento estruturado e suporte completo.",
    features: [
      "Assessoria completa e acompanhamento estratégico",
      "Geração contínua de oportunidades de emprego",
      "Análise personalizada dos profissionais ideais",
      "Acesso a mais de 5.000 profissionais qualificados",
      "Participação em eventos mensais de networking",
      "Conteúdos exclusivos com dicas práticas e crescimento empresarial",
    ],
    footer: "Indicado para empresas que querem escalar com suporte especializado.",
    cta: "Quero o Premium",
    highlight: false,
  },
];

function PlanosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Planos e assinaturas
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Escolha o plano ideal para você
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Profissionais e empresas da segurança privada conectados em uma única plataforma.
        </p>
      </div>

      {/* Profissional */}
      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl font-bold">Para profissionais</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <PlanCard {...PROFESSIONAL} />
          <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-8 lg:col-span-2">
            <h3 className="font-display text-xl font-bold">Por que assinar?</h3>
            <p className="mt-3 text-muted-foreground">
              Por menos de R$ 0,70 por dia você acessa vagas exclusivas, conteúdo da comunidade
              e cursos gratuitos para destacar seu currículo no mercado de segurança privada.
            </p>
          </div>
        </div>
      </section>

      {/* Empresas */}
      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl font-bold">Para empresas</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {COMPANY_PLANS.map((p) => (
            <PlanCard key={p.name} {...p} ctaTo="/cadastro-empresa" />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <div className="mt-20 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 to-transparent p-10 text-center">
        <h3 className="font-display text-2xl font-bold">Dúvidas sobre qual plano escolher?</h3>
        <p className="mt-2 text-muted-foreground">
          Fale com nosso time e receba uma recomendação personalizada para sua operação.
        </p>
        <Button asChild className="mt-6 h-12 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90">
          <Link to="/cadastro-empresa">Falar com especialista</Link>
        </Button>
      </div>
    </div>
  );
}

type PlanCardProps = {
  name: string;
  price: string;
  period: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  cta: string;
  ctaTo?: string;
  tag?: string;
  footer?: string;
  highlight?: boolean;
};

function PlanCard({
  name,
  price,
  period,
  icon: Icon,
  description,
  features,
  cta,
  ctaTo = "/cadastro",
  tag,
  footer,
  highlight,
}: PlanCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 ${
        highlight
          ? "border-primary bg-gradient-to-br from-primary/15 to-transparent shadow-gold"
          : "border-border/60 bg-card"
      }`}
    >
      {tag && (
        <Badge className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-primary-foreground">
          {tag}
        </Badge>
      )}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            highlight ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold">{name}</h3>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>

      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {footer && (
        <p className="mt-6 rounded-xl bg-surface/60 p-3 text-xs text-muted-foreground">
          👉 {footer}
        </p>
      )}

      <Button
        asChild
        className={`mt-8 h-12 rounded-full font-semibold ${
          highlight
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
      >
        <Link to={ctaTo}>{cta}</Link>
      </Button>
    </div>
  );
}
