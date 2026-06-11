import { ThumbsUp, MousePointerClick, GitBranch, Lock, Palette, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LandingBenefits() {
  return (
    <section id="benefits" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Benefícios</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Feito para times que ouvem antes de construir
          </h2>
          <p className="text-muted-foreground mt-4 text-base text-balance">
            Substitua suposições, e-mails soltos e pedidos no privado por um espaço aberto com a sua comunidade.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <div className="bg-card border-border/60 rounded-2xl border p-8 md:col-span-2">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <ThumbsUp className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">A voz da sua comunidade</h3>
            <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
              Usuários votam, comentam e explicam o que precisam. Você acompanha tudo em um só lugar e responde com
              transparência.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary">Votação aberta</Badge>
              <Badge variant="secondary">Discussões públicas</Badge>
              <Badge variant="secondary">Histórico completo</Badge>
            </div>
          </div>

          <div className="bg-card border-border/60 rounded-2xl border p-8">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <MousePointerClick className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Zero atrito</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Interface simples para sua equipe organizar e para seus usuários enviarem feedback em segundos.
            </p>
          </div>

          <div className="bg-card border-border/60 rounded-2xl border p-8">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Permissões por papel</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Defina quem vê, responde, modera ou administra cada canal. Segurança sem complicar o dia a dia.
            </p>
          </div>

          <div className="bg-card border-border/60 rounded-2xl border p-8 md:col-span-2">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Workflow className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Do feedback à entrega</h3>
            <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
              Receba pedidos, priorize com a comunidade, acompanhe o status e comunique o que foi entregue. Um fluxo
              contínuo, do pedido à release.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs">
              <div className="bg-background flex items-center gap-2 rounded-md border px-3 py-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Concluído
              </div>
              <GitBranch className="text-muted-foreground h-3.5 w-3.5" />
              <div className="bg-background flex items-center gap-2 rounded-md border px-3 py-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Em construção
              </div>
              <GitBranch className="text-muted-foreground h-3.5 w-3.5" />
              <div className="bg-background flex items-center gap-2 rounded-md border px-3 py-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-slate-400" />A fazer
              </div>
            </div>
          </div>

          <div className="bg-card border-border/60 rounded-2xl border p-8 md:col-span-3">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Palette className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Personalize do seu jeito</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Status, tags, descrições, cores — adapte cada feedback à realidade do seu produto e do seu público.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-sky-500 px-2.5 py-1 text-xs font-medium text-white">Mobile</span>
                <span className="rounded-md bg-violet-500 px-2.5 py-1 text-xs font-medium text-white">Integrações</span>
                <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white">Relatórios</span>
                <span className="rounded-md bg-pink-500 px-2.5 py-1 text-xs font-medium text-white">UI</span>
                <span className="rounded-md bg-orange-500 px-2.5 py-1 text-xs font-medium text-white">Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
