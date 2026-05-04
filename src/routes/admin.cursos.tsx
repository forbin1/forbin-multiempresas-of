import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/cursos")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={GraduationCap}
        eyebrow="Conteúdo educacional"
        title="Cursos"
        description="Editar, excluir, adicionar e ocultar cursos da plataforma."
        actions={<Button className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Novo curso</Button>}
      />
      <AdminPlaceholder note="CRUD completo de cursos será implementado na próxima etapa." />
    </div>
  ),
});
