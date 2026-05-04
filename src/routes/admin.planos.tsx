import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/planos")({
  component: () => (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={CreditCard}
        eyebrow="Monetização"
        title="Planos"
        description="Editar valores e benefícios dos planos. As mudanças refletem automaticamente na página /planos."
      />
      <AdminPlaceholder note="Tabela de planos no banco + edição em tempo real será implementada na próxima etapa." />
    </div>
  ),
});
