import { Inbox, ThumbsUp, MessageCircle, Shield } from "lucide-react";

const stats = [
  {
    icon: Inbox,
    label: "Canais temáticos",
    description: "Crie canais para feature requests, bugs, sugestões e o que mais precisar.",
  },
  {
    icon: ThumbsUp,
    label: "Votação da comunidade",
    description: "Os usuários priorizam o que mais importa. Você decide com dados, não com achismo.",
  },
  {
    icon: MessageCircle,
    label: "Diálogo aberto",
    description: "Comente, responda e mantenha sua comunidade engajada em cada decisão.",
  },
  {
    icon: Shield,
    label: "Privado e seguro",
    description: "Controle quem vê, comenta ou administra cada canal da sua organização.",
  },
];

export function LandingStats() {
  return (
    <section className="bg-muted/30 border-y">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{stat.label}</p>
                <p className="text-muted-foreground text-xs">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
