import { createFileRoute } from "@tanstack/react-router";
import { LayoutTemplate } from "lucide-react";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/landing")({
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminPageHeader
        icon={LayoutTemplate}
        eyebrow="CMS"
        title="Landing Page"
        description="Editor visual completo de textos e imagens da página inicial."
      />
      <AdminPlaceholder note="Editor visual (CMS) da landing será implementado em uma etapa dedicada — é um módulo grande." />
    </div>
  ),
});
