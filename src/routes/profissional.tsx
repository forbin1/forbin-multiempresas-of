import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  Briefcase,
  Award,
  Image as ImageIcon,
  Video,
  FileText,
  Heart,
  MessageCircle,
  CheckCircle2,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { POSTS } from "@/data/mock";
import { MentionText } from "@/components/MentionText";
import { toast } from "sonner";

export const Route = createFileRoute("/profissional")({
  head: () => ({
    meta: [
      { title: "Carlos Mendes — Perfil profissional · FORBIN" },
      { name: "description", content: "Perfil de profissional de segurança privada na plataforma FORBIN." },
    ],
  }),
  component: PerfilProfissional,
});

function PerfilProfissional() {
  return (
    <div>
      {/* COVER */}
      <div className="relative h-56 overflow-hidden border-b border-border/60 sm:h-72">
        <div className="absolute inset-0 bg-gradient-gold opacity-30" />
        <div className="absolute inset-0 bg-radial-gold" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 25%, oklch(0.83 0.17 88 / 30%) 25%, oklch(0.83 0.17 88 / 30%) 50%, transparent 50%, transparent 75%, oklch(0.83 0.17 88 / 30%) 75%)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header card */}
        <div className="-mt-20 rounded-3xl border border-border/60 bg-card/85 p-6 shadow-elevated backdrop-blur-xl backdrop-saturate-150 sm:p-8">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-card bg-gradient-gold font-display text-5xl font-extrabold text-primary-foreground shadow-gold">
              CM
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Carlos Mendes</h1>
                <Badge className="rounded-full border-success/40 bg-success/15 text-success">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verificado FORBIN
                </Badge>
              </div>
              <p className="mt-1 text-lg text-muted-foreground">
                Vigilante Líder · 8 anos de experiência
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> São Paulo, SP</span>
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-primary" /> carlos@email.com</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-primary" /> (11) 99999-0000</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-[#25D366] px-6 font-semibold text-white hover:bg-[#1ebe5a]">
                <a href="https://wa.me/5511999990000" target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="mr-2 h-5 w-5 text-white" /> WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="h-12 rounded-full">
                <Heart className="mr-2 h-5 w-5" /> Salvar
              </Button>
            </div>
          </div>

          {/* Mini stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/60 pt-6">
            <Stat label="Cursos" value="7" />
            <Stat label="Anos de experiência" value="8" />
            <Stat label="Postos atendidos" value="23" />
          </div>
        </div>

        {/* Conteúdo em colunas */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Tabs defaultValue="feed">
              <TabsList className="h-12 w-full rounded-2xl bg-card p-1">
                <TabsTrigger value="feed" className="flex-1 rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Publicações
                </TabsTrigger>
                <TabsTrigger value="sobre" className="flex-1 rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sobre
                </TabsTrigger>
                <TabsTrigger value="experiencia" className="flex-1 rounded-xl text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Experiência
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6 space-y-6">
                <ComposeBox />
                {POSTS.slice(0, 3).map((p, i) => (
                  <PostCard key={p.id} post={p} owned={i === 0} />
                ))}
              </TabsContent>

              <TabsContent value="sobre" className="mt-6">
                <Card title="Resumo profissional">
                  <p className="leading-relaxed text-muted-foreground">
                    Vigilante líder com 8 anos de atuação em segurança patrimonial e eventos corporativos.
                    Especializado em controle de acesso, gestão de equipes e operação de sistemas de monitoramento.
                    Disciplina, ética e prontidão são meus pilares.
                  </p>
                </Card>
                <Card title="Dados pessoais" className="mt-6">
                  <DataGrid items={[
                    ["Idade", "34 anos"],
                    ["Altura", "1,82 m"],
                    ["Estado civil", "Casado"],
                    ["Serviço militar", "Exército — Tiro de Guerra"],
                    ["CNH", "Categoria B"],
                    ["Disponibilidade", "Imediata"],
                  ]} />
                </Card>
              </TabsContent>

              <TabsContent value="experiencia" className="mt-6 space-y-4">
                {[
                  { role: "Vigilante Líder", company: "Vigilância Total LTDA", period: "2021 — atual", desc: "Liderança de equipe de 12 vigilantes em condomínio premium." },
                  { role: "Vigilante", company: "Águia Negra Segurança", period: "2018 — 2021", desc: "Atuação em postos comerciais e eventos." },
                  { role: "Porteiro", company: "Edifício Comercial Centro", period: "2016 — 2018", desc: "Controle de acesso e atendimento." },
                ].map((e) => (
                  <div key={e.role} className="rounded-2xl border border-border/60 bg-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{e.role}</p>
                        <p className="text-sm text-muted-foreground">{e.company} · {e.period}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card title="Cursos & certificações">
              <ul className="space-y-3">
                {[
                  "Formação de Vigilante",
                  "Reciclagem 2024",
                  "Vigilante Líder",
                  "Operador de CFTV",
                  "Defesa Pessoal",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Procurando">
              <div className="space-y-3 text-sm">
                <Row label="Função" value="Vigilante / Supervisor" />
                <Row label="Região" value="Grande São Paulo" />
                <Row label="Modalidade" value="CLT — 12x36" />
                <Row label="Disponível" value="Imediato" />
              </div>
            </Card>

            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Aluno FORBIN</p>
                  <p className="mt-1 text-sm text-muted-foreground">Formado pela escola FORBIN em 2016.</p>
                </div>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full rounded-full">
              <Link to="/feed">Ver feed completo</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-card p-6 ${className ?? ""}`}>
      <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
      {children}
    </div>
  );
}

function DataGrid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border/60 bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p>
          <p className="mt-1 font-semibold">{v}</p>
        </div>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function ComposeBox() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-bold text-primary-foreground sm:h-12 sm:w-12">
          CM
        </div>
        <input
          placeholder="Compartilhe uma atualização…"
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-surface px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:h-12 sm:px-5"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" className="rounded-full text-xs text-muted-foreground sm:text-sm"><FileText className="mr-1.5 h-4 w-4 text-primary sm:mr-2" /> Texto</Button>
          <Button variant="ghost" size="sm" className="rounded-full text-xs text-muted-foreground sm:text-sm"><ImageIcon className="mr-1.5 h-4 w-4 text-primary sm:mr-2" /> Foto</Button>
          <Button variant="ghost" size="sm" className="rounded-full text-xs text-muted-foreground sm:text-sm"><Video className="mr-1.5 h-4 w-4 text-primary sm:mr-2" /> Vídeo</Button>
          <Button variant="ghost" size="sm" className="hidden rounded-full text-xs text-muted-foreground sm:inline-flex sm:text-sm"><Calendar className="mr-1.5 h-4 w-4 text-primary sm:mr-2" /> Evento</Button>
        </div>
        <Button className="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-gold hover:bg-primary/90 sm:px-6">
          Publicar
        </Button>
      </div>
    </div>
  );
}

export function PostCard({ post, owned = false }: { post: typeof POSTS[number]; owned?: boolean }) {
  const [content, setContent] = useState(post.content);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.content);
  const [deleted, setDeleted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<{ id: string; author: string; text: string }[]>([]);
  const [commentDraft, setCommentDraft] = useState("");

  if (deleted) return null;

  const handle = post.author.toLowerCase().replace(/\s+/g, ".");
  const totalComments = post.comments + comments.length;

  const toggleLike = () => {
    setLiked((prev) => {
      setLikes((l) => l + (prev ? -1 : 1));
      return !prev;
    });
  };

  const addComment = () => {
    const text = commentDraft.trim();
    if (!text) return;
    setComments((c) => [...c, { id: `${Date.now()}`, author: "Você", text }]);
    setCommentDraft("");
  };

  return (
    <article className="rounded-2xl border border-border/60 bg-card p-4 sm:p-6">
      <header className="flex items-center gap-3">
        <Link
          to="/u/$handle"
          params={{ handle }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-bold text-primary-foreground transition hover:opacity-90"
        >
          {post.avatar}
        </Link>
        <div className="min-w-0 flex-1">
          <Link to="/u/$handle" params={{ handle }} className="block truncate font-semibold hover:underline">
            {post.author}
          </Link>
          <p className="truncate text-xs text-muted-foreground">{post.role} · {post.time}</p>
        </div>
        {owned && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => { setDraft(content); setEditing(true); }}>
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => { setDeleted(true); toast.success("Post excluído"); }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>
      {editing ? (
        <div className="mt-4 space-y-3">
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancelar</Button>
            <Button size="sm" onClick={() => { setContent(draft); setEditing(false); toast.success("Post atualizado"); }}>Salvar</Button>
          </div>
        </div>
      ) : (
        <p className="mt-4 break-words text-base leading-relaxed">
          <MentionText>{content}</MentionText>
        </p>
      )}
      {post.image && (
        <img src={post.image} alt="" className="mt-4 w-full rounded-xl border border-border/60 object-cover" />
      )}
      {post.video && (
        <video
          src={post.video}
          controls
          playsInline
          className="mt-4 w-full rounded-xl border border-border/60 bg-black"
        />
      )}
      <footer className="mt-5 flex flex-wrap items-center gap-1 border-t border-border/60 pt-4 text-sm text-muted-foreground sm:gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLike}
          className={`rounded-full ${liked ? "text-primary" : ""}`}
        >
          <Heart className={`mr-1.5 h-4 w-4 sm:mr-2 ${liked ? "fill-primary" : ""}`} /> {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments((s) => !s)}
          className="rounded-full"
        >
          <MessageCircle className="mr-1.5 h-4 w-4 sm:mr-2" /> {totalComments}
        </Button>
      </footer>
      {showComments && (
        <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl bg-surface px-3 py-2 text-sm">
              <p className="font-semibold">{c.author}</p>
              <p className="text-muted-foreground">{c.text}</p>
            </div>
          ))}
          <div className="flex gap-2">
            <Textarea
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="Escreva um comentário..."
              rows={1}
              className="min-h-[40px] resize-none"
            />
            <Button size="sm" onClick={addComment}>Enviar</Button>
          </div>
        </div>
      )}
    </article>
  );
}
