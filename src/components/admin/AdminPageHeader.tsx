import type { LucideIcon } from "lucide-react";

export function AdminPageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function AdminPlaceholder({ note }: { note: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
      <p className="font-display text-lg font-semibold">Em construção</p>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}
