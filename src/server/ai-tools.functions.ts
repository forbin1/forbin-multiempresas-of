import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

async function callAI(system: string, user: string): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY não configurada");

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (res.status === 429) throw new Error("Limite de requisições atingido. Tente novamente em instantes.");
  if (res.status === 402) throw new Error("Créditos de IA esgotados. Adicione créditos na Workspace.");
  if (!res.ok) {
    const txt = await res.text();
    console.error("AI gateway error", res.status, txt);
    throw new Error("Falha ao chamar a IA.");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export const generateJobDescription = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ idea: z.string().min(3).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const system = `Você é um recrutador especialista em segurança privada no Brasil. 
Crie descrições de vaga completas, claras e profissionais em português BR, no formato Markdown, com seções:
**Sobre a vaga**, **Responsabilidades**, **Requisitos**, **Diferenciais**, **Benefícios**, **Carga horária**.
Use linguagem direta e respeitosa. Não invente nome de empresa.`;
    const text = await callAI(system, `Crie uma descrição de vaga completa para: ${data.idea}`);
    return { text };
  });

export const reviewResume = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ resume: z.string().min(20).max(8000) }).parse(input),
  )
  .handler(async ({ data }) => {
    const system = `Você é um consultor de carreira para profissionais de segurança privada no Brasil. 
Analise o currículo do usuário e devolva, em Markdown português BR:
**Pontos fortes** (lista), **Pontos a melhorar** (lista), **Sugestão de texto reescrito** (versão profissional pronta para usar), **Palavras-chave recomendadas**.
Seja construtivo, objetivo e específico para a área de segurança.`;
    const text = await callAI(system, data.resume);
    return { text };
  });

export const summarizeCandidate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ candidate: z.string().min(10).max(8000) }).parse(input),
  )
  .handler(async ({ data }) => {
    const system = `Você é um assistente de recrutamento. 
Resuma o perfil do candidato de segurança privada para um recrutador apressado, em Markdown português BR:
**Resumo executivo** (3-4 linhas), **Experiência relevante**, **Formações/Cursos**, **Pontos de atenção**, **Recomendação** (Forte / Médio / Não recomendado para a vaga, com justificativa curta).`;
    const text = await callAI(system, data.candidate);
    return { text };
  });
