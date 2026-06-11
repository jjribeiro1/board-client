import { Building2, LayoutGrid, Megaphone } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Crie sua organização",
    description: "Em menos de 1 minuto você cria uma organização, personaliza o nome e está pronto para começar.",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Configure seus canais",
    description:
      "Crie canais para cada tipo de feedback: feature requests, bugs, sugestões e o que fizer sentido para o seu produto.",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Engaje sua comunidade",
    description:
      "Convide usuários e seu time, colete feedback, vote, comente e construa o que sua comunidade realmente pede.",
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Como funciona</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Em três passos, você está ouvindo seus usuários
          </h2>
          <p className="text-muted-foreground mt-4 text-base text-balance">
            Sem curva de aprendizado. Sem semanas de implantação. Você recebe o primeiro feedback no mesmo dia.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="via-border absolute inset-x-0 top-12 hidden h-px bg-gradient-to-r from-transparent to-transparent lg:block" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="bg-background border-primary text-primary relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 shadow-sm">
                  <step.icon className="h-9 w-9" />
                </div>
                <span className="text-primary/40 absolute -top-2 font-mono text-6xl font-bold select-none">
                  {step.number}
                </span>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
