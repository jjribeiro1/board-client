import { LayoutGrid, Tag, ListChecks, MessageSquare, Bell, Building2, UserPlus, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: LayoutGrid,
    title: "Canais temáticos",
    description:
      "Crie canais separados para feature requests, bugs, sugestões e ideias. Cada tipo de feedback no seu lugar.",
  },
  {
    icon: ListChecks,
    title: "Status transparente",
    description: "Mostre à sua comunidade o que está em análise, em construção ou concluído. Zero caixa-preta.",
  },
  {
    icon: Tag,
    title: "Tags personalizadas",
    description: "Categorize feedbacks com tags visuais para identificar áreas, prioridades e temas recorrentes.",
  },
  {
    icon: ThumbsUp,
    title: "Votação e priorização",
    description:
      "Seus usuários votam nos pedidos mais importantes. Você decide a roadmap com base em quem usa o produto.",
  },
  {
    icon: MessageSquare,
    title: "Discussões por feedback",
    description:
      "Cada pedido vira uma conversa. Tire dúvidas, peça contexto e mantenha o diálogo aberto com a comunidade.",
  },
  {
    icon: Building2,
    title: "Múltiplas organizações",
    description: "Gerencie vários produtos ou marcas a partir de uma única conta. Troque de organização com um clique.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Funcionalidades</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tudo o que você precisa para ouvir sua comunidade
          </h2>
          <p className="text-muted-foreground mt-4 text-base text-balance">
            Uma plataforma completa para receber, organizar e priorizar o feedback dos seus usuários.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border-border/60 hover:border-primary/40 group rounded-xl border p-6 transition-colors"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
