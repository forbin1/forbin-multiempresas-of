import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, FileText, UserSearch, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  generateJobDescription,
  reviewResume,
  summarizeCandidate,
} from "@/server/ai-tools.functions";

export const Route = createFileRoute("/ferramentas-ia")({
  head: () => ({
    meta: [
      { title: "Ferramentas de IA — FORBIN" },
      {
        name: "description",
        content:
          "Gerador de vagas, revisor de currículo e resumo de candidato com IA, sob medida para segurança privada.",
      },
    ],
  }),
  component: FerramentasIA,
});

function FerramentasIA() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="h-3.5 w-3.5" /> IA aplicada
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Ferramentas inteligentes
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Acelere recrutamento e candidaturas com IA treinada para o setor de segurança privada.
          Sem custo extra de API.
        </p>
      </div>

      <Tabs defaultValue="vaga" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 rounded-2xl bg-card p-1 sm:grid-cols-3">
          <TabsTrigger value="vaga" className="rounded-xl py-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="mr-2 h-4 w-4" /> Gerador de vaga
          </TabsTrigger>
          <TabsTrigger value="cv" className="rounded-xl py-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="mr-2 h-4 w-4" /> Revisor de currículo
          </TabsTrigger>
          <TabsTrigger value="cand" className="rounded-xl py-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <UserSearch className="mr-2 h-4 w-4" /> Resumo de candidato
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaga" className="mt-6">
          <AITool
            title="Gerador de descrição de vaga"
            subtitle="Descreva a vaga em uma frase. A IA escreve a descrição completa pronta para publicar."
            placeholder="Ex.: vigilante 12x36 para condomínio em São Paulo, com curso de CFTV"
            buttonLabel="Gerar vaga"
            run={async (input) => (await generateJobDescription({ data: { idea: input } })).text}
            minRows={3}
          />
        </TabsContent>

        <TabsContent value="cv" className="mt-6">
          <AITool
            title="Revisor de currículo"
            subtitle="Cole o texto do seu currículo. A IA aponta melhorias e devolve uma versão profissional."
            placeholder="Cole aqui o conteúdo do seu currículo..."
            buttonLabel="Revisar currículo"
            run={async (input) => (await reviewResume({ data: { resume: input } })).text}
            minRows={10}
          />
        </TabsContent>

        <TabsContent value="cand" className="mt-6">
          <AITool
            title="Resumo automático de candidato"
            subtitle="Cole o perfil ou currículo do candidato. A IA gera um resumo executivo para o recrutador."
            placeholder="Cole aqui o perfil/currículo do candidato..."
            buttonLabel="Resumir candidato"
            run={async (input) => (await summarizeCandidate({ data: { candidate: input } })).text}
            minRows={10}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AITool({
  title,
  subtitle,
  placeholder,
  buttonLabel,
  run,
  minRows = 6,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
  run: (input: string) => Promise<string>;
  minRows?: number;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    if (input.trim().length < 3) {
      toast.error("Adicione mais detalhes");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const text = await run(input.trim());
      setOutput(text);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro ao processar";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        rows={minRows}
        className="mt-5 resize-y rounded-xl border-border/70 bg-surface text-sm"
      />

      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleRun}
          disabled={loading}
          className="rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-gold hover:bg-primary/90"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> {buttonLabel}</>
          )}
        </Button>
      </div>

      {output && (
        <div className="mt-6 rounded-2xl border border-primary/30 bg-surface p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
              Resultado
            </h3>
            <Button size="sm" variant="ghost" className="rounded-full" onClick={handleCopy}>
              {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-strong:text-primary prose-li:text-foreground">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
