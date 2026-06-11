import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#how-it-works", label: "Como funciona" },
  { href: "#benefits", label: "Benefícios" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">FeatureFlow</span>
        </Link>

        <ul className="text-muted-foreground hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "hidden sm:inline-flex" })}
          >
            Entrar
          </Link>
          <Button asChild size="sm">
            <Link href="/register">
              <Sparkles className="h-4 w-4" />
              Criar conta
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
