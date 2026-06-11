import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Pronto para ouvir o que seus usuários têm a dizer?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-balance opacity-90 sm:text-lg">
              Crie sua conta gratuita, configure seus canais e comece a receber feedback da sua comunidade em menos de 2
              minutos.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="h-11 px-6">
                <Link href="/register">
                  Criar conta gratuita
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 h-11 px-6"
              >
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
