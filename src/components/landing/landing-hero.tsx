import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="from-primary/5 via-background to-background absolute inset-0 -z-10 bg-gradient-to-b" />
      <div
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-border) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8 lg:pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="border-border/60 bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
            <Sparkles className="text-primary h-3.5 w-3.5" />
            <span>A voz da sua comunidade, no centro do seu produto</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Construa o que seus usuários{" "}
            <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
              realmente pedem
            </span>
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-base text-balance sm:text-lg">
            Receba feature requests, bugs e sugestões em canais temáticos. Sua comunidade vota, comenta e prioriza — e
            seu time sabe exatamente o que construir a seguir.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href="/register">
                Começar gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <a href="#how-it-works">Ver como funciona</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="from-primary/15 via-primary/5 absolute -inset-6 rounded-[2rem] bg-gradient-to-br to-transparent opacity-80 blur-3xl" />
            <div className="bg-primary/10 absolute -top-6 -right-6 h-36 w-36 animate-pulse rounded-full blur-3xl" />
            <div className="bg-primary/5 absolute -bottom-8 -left-8 h-48 w-48 rounded-full blur-3xl" />
            <div className="border-border/40 relative overflow-hidden rounded-xl border shadow-2xl">
              <Image
                src="/feature-flow-home.png"
                alt="Feature Flow - Plataforma de feedback"
                width={1200}
                height={675}
                className="relative"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
