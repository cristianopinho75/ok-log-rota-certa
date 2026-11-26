import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/oklog-logo.png.asset.json";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Frota", href: "#frota" },
  { label: "Rastreamento", href: "#rastreamento" },
  { label: "Sobre", href: "#sobre" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:flex lg:justify-between lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Ok Log Transporte"
            className="h-10 w-auto shrink-0 object-contain sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cotacao"
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-bold text-cta-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
          >
            Solicitar Cotação
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-secondary lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 sm:px-6 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Menu mobile">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cotacao"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta-hover"
            >
              Solicitar Cotação
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}