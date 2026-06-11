"use client";

import { Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const faqs = [
  {
    question: "O que é o FeatureFlow?",
    answer:
      "É uma plataforma para você receber, organizar e priorizar o feedback dos usuários do seu produto — tudo em um só lugar, com canais para feature requests, bugs e sugestões.",
  },
  {
    question: "O que são canais?",
    answer:
      "Canais são espaços organizados por tipo de feedback. Você pode ter, por exemplo, um canal de Feature Requests, um de Bugs e um de Sugestões — cada um com seus próprios status, tags e regras.",
  },
  {
    question: "Posso usar para mais de um produto ou empresa?",
    answer:
      "Sim. Você pode criar e participar de várias organizações a partir de uma única conta, cada uma com seus próprios canais, membros e permissões.",
  },
  {
    question: "Como meus usuários enviam feedback?",
    answer:
      "Eles acessam o canal público, preenchem um pedido, votam em ideias de outros usuários e acompanham o status das mudanças.",
  },
];

export function LandingFAQ() {
  return (
    <section id="faq" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Perguntas frequentes</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Tire suas dúvidas</h2>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.question}
              className="bg-card border-border/60 group data-[state=open]:border-primary/40 rounded-xl border px-5 transition-colors"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium hover:no-underline">
                <span>{faq.question}</span>
                <Plus className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-45" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <p className="text-muted-foreground pb-4 text-sm leading-relaxed">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
