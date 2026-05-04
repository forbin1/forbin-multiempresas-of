import { createFileRoute } from "@tanstack/react-router";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/profissionais")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={Users}
        eyebrow="Pessoas"
        title="Profissionais"
        description="Editar, excluir, adicionar e ocultar profissionais."
        actions={<Button className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Adicionar</Button>}
      />
      <AdminPlaceholder note="CRUD completo de profissionais será implementado na próxima etapa." />
    </div>
  ),
});
