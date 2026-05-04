import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/vagas")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={Briefcase}
        eyebrow="Oportunidades"
        title="Vagas"
        description="Editar, excluir, adicionar e ocultar vagas."
        actions={<Button className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Nova vaga</Button>}
      />
      <AdminPlaceholder note="CRUD completo de vagas será implementado na próxima etapa." />
    </div>
  ),
});
