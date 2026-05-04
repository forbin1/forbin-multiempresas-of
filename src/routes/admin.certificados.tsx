import { createFileRoute } from "@tanstack/react-router";
import { Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/certificados")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={Award}
        eyebrow="Conquistas"
        title="Certificados"
        description="Editar, excluir, adicionar e ocultar modelos de certificados exibidos para profissionais que concluíram cursos."
        actions={<Button className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Novo modelo</Button>}
      />
      <AdminPlaceholder note="Galeria de modelos de certificados será implementada na próxima etapa." />
    </div>
  ),
});
