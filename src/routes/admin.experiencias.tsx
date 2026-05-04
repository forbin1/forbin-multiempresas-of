import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/experiencias")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={Sparkles}
        eyebrow="Feed da comunidade"
        title="Experiências"
        description="Editar, excluir, adicionar e ocultar publicações."
        actions={<Button className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Nova publicação</Button>}
      />
      <AdminPlaceholder note="Moderação e CRUD de experiências serão implementados na próxima etapa." />
    </div>
  ),
});
