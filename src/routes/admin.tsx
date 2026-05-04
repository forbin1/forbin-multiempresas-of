import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Shield, Users, Briefcase, GraduationCap, Building2, Upload, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin — FORBIN" },
      { name: "description", content: "Painel administrativo da plataforma FORBIN." },
    ],
  }),
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/login" });
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw redirect({ to: "/" });
  },
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Administração</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Painel Admin</h1>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={Users} label="Profissionais" value="—" />
        <Card icon={Building2} label="Empresas" value="—" />
        <Card icon={Briefcase} label="Vagas ativas" value="—" />
        <Card icon={GraduationCap} label="Cursos" value="—" />
      </div>

      <VslUploader />

      <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8">
        <h2 className="font-display text-xl font-bold">Atalhos</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-full"><Link to="/vagas">Ver vagas</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/cursos">Ver cursos</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/feed">Ver feed</Link></Button>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function VslUploader() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "vsl_url")
      .maybeSingle()
      .then(({ data }) => setCurrentUrl(data?.value ?? null));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "mp4";
      const path = `vsl-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("vsl")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from("vsl").getPublicUrl(path);

      const { error: setErr } = await supabase
        .from("site_settings")
        .upsert({ key: "vsl_url", value: publicUrl, updated_at: new Date().toISOString() });
      if (setErr) throw setErr;

      setCurrentUrl(publicUrl);
      toast.success("VSL atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar vídeo: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "vsl_url", value: null, updated_at: new Date().toISOString() });
    if (error) {
      toast.error("Erro ao remover");
      return;
    }
    setCurrentUrl(null);
    toast.success("VSL removida");
  };

  return (
    <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Video className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Vídeo VSL da Landing</h2>
          <p className="text-sm text-muted-foreground">Vídeo exibido no topo da página inicial (autoplay, sem controles).</p>
        </div>
      </div>

      {currentUrl && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-border/60">
          <video src={currentUrl} controls className="aspect-video w-full bg-black" />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          {uploading ? "Enviando..." : currentUrl ? "Substituir vídeo" : "Enviar vídeo"}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
        {currentUrl && (
          <Button variant="outline" className="rounded-full" onClick={handleRemove}>
            Remover
          </Button>
        )}
      </div>
    </div>
  );
}
